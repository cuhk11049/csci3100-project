Then /^I should see keyword filter$/ do
  expect(page).to have_css('#keyword-autocomplete-menu', visible: false)
  fill_in("keyword",with:"a")
end