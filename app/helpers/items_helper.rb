module ItemsHelper
  def quick_filter_button_classes(active)
    active ? "quick-filter-pill is-active" : "quick-filter-pill"
  end
end
