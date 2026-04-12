import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "menu", "option", "quickFilters"]
  static values = {
    url: String
  }

  connect() {
    this.abortController = null
    this.closeTimeout = null
    this.highlightedIndex = -1
    this.searchTimeout = null
  }

  disconnect() {
    this.abortPendingRequest()
    this.clearCloseTimeout()
    this.clearSearchTimeout()
  }

  search() {
    const query = this.inputTarget.value.trim()

    this.highlightedIndex = -1

    if (query.length < 1) {
      this.abortPendingRequest()
      this.clearSearchTimeout()
      this.hideMenu()
      return
    }

    this.clearCloseTimeout()
    this.clearSearchTimeout()
    this.searchTimeout = setTimeout(() => this.fetchSuggestions(query), 120)
  }

  handleKeydown(event) {
    if (!this.isMenuOpen()) {
      return
    }

    switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      this.moveHighlight(1)
      break
    case "ArrowUp":
      event.preventDefault()
      this.moveHighlight(-1)
      break
    case "Enter":
      if (this.highlightedIndex >= 0) {
        event.preventDefault()
        this.choose(this.optionTargets[this.highlightedIndex].dataset.value)
      }
      break
    case "Escape":
      this.hideMenu()
      break
    default:
      break
    }
  }

  selectSuggestion(event) {
    event.preventDefault()
    this.choose(event.currentTarget.dataset.value)
  }

  scheduleClose() {
    this.clearCloseTimeout()
    this.closeTimeout = setTimeout(() => this.hideMenu(), 120)
  }

  openIfResults() {
    this.clearCloseTimeout()

    if (this.hasOptionTarget) {
      this.showMenu()
    }
  }

  async fetchSuggestions(query) {
    this.abortPendingRequest()
    this.abortController = new AbortController()

    const url = new URL(this.urlValue, window.location.origin)
    url.searchParams.set("q", query)

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json"
        },
        signal: this.abortController.signal
      })

      if (!response.ok) {
        throw new Error(`Autocomplete request failed with status ${response.status}`)
      }

      const suggestions = await response.json()

      if (this.inputTarget.value.trim() !== query) {
        return
      }

      this.renderSuggestions(suggestions)
    } catch (error) {
      if (error.name === "AbortError") {
        return
      }

      this.hideMenu()
      console.error(error)
    }
  }

  renderSuggestions(suggestions) {
    this.menuTarget.innerHTML = ""
    this.highlightedIndex = -1

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      this.hideMenu()
      return
    }

    suggestions.forEach((suggestion, index) => {
      const option = document.createElement("button")
      option.type = "button"
      option.className = "autocomplete-option"
      option.dataset.action = "mousedown->autocomplete#selectSuggestion"
      option.dataset.value = suggestion
      option.dataset.autocompleteTarget = "option"
      option.setAttribute("role", "option")
      option.setAttribute("id", this.optionId(index))
      option.textContent = suggestion
      this.menuTarget.append(option)
    })

    this.showMenu()
  }

  moveHighlight(direction) {
    const options = this.optionTargets

    if (options.length === 0) {
      return
    }

    this.highlightedIndex = (this.highlightedIndex + direction + options.length) % options.length
    this.syncHighlight()
  }

  syncHighlight() {
    this.optionTargets.forEach((option, index) => {
      const isActive = index === this.highlightedIndex
      option.classList.toggle("is-active", isActive)
      option.setAttribute("aria-selected", isActive ? "true" : "false")
    })

    if (this.highlightedIndex >= 0) {
      const activeOption = this.optionTargets[this.highlightedIndex]
      this.inputTarget.setAttribute("aria-activedescendant", activeOption.id)
      activeOption.scrollIntoView({ block: "nearest" })
    } else {
      this.inputTarget.removeAttribute("aria-activedescendant")
    }
  }

  choose(value) {
    this.inputTarget.value = value
    this.hideMenu()
    this.submitForm()
  }

  applyQuickFilter(event) {
    const { filterId } = event.params
    const activeFilters = this.selectedQuickFilters()

    if (activeFilters.includes(filterId)) {
      this.quickFiltersTarget.value = activeFilters.filter((id) => id !== filterId).join(",")
    } else {
      this.quickFiltersTarget.value = [ ...activeFilters, filterId ].join(",")
    }

    this.submitForm()
  }

  showMenu() {
    this.menuTarget.hidden = false
    this.inputTarget.setAttribute("aria-expanded", "true")
  }

  hideMenu() {
    this.menuTarget.hidden = true
    this.highlightedIndex = -1
    this.inputTarget.setAttribute("aria-expanded", "false")
    this.inputTarget.removeAttribute("aria-activedescendant")
  }

  isMenuOpen() {
    return !this.menuTarget.hidden
  }

  optionId(index) {
    return `${this.identifier}-option-${index}`
  }

  selectedQuickFilters() {
    return this.quickFiltersTarget.value
      .split(",")
      .map((filterId) => filterId.trim())
      .filter(Boolean)
  }

  submitForm() {
    this.clearCloseTimeout()
    this.clearSearchTimeout()
    this.element.requestSubmit()
  }

  abortPendingRequest() {
    this.abortController?.abort()
    this.abortController = null
  }

  clearSearchTimeout() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = null
    }
  }

  clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
      this.closeTimeout = null
    }
  }
}
