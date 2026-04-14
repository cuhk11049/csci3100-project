Then /^I should see keyword filter$/ do
  expect(page).to have_css('#keyword-autocomplete-menu', visible: false)
  fill_in("keyword",with:"a")
end

Then /^"([^"]*)" should appear before "([^"]*)"$/ do |first,last|
  regex = / *#{first}.*#{last}/m
  expect(page.body).to match(regex)
end

Then /^(?:|I )should see "([^"]*)" or "([^"]*)"$/ do |text1,text2|
  regex = /#{text1}|#{text2}/m
  expect(page.text).to match(regex)
end