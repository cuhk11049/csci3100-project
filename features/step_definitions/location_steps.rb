When /^the locations were added$/ do
  locations_list = [
    { name: "Chung Chi College", lat: 22.4196, lng: 114.2056 },
    { name: "United College", lat: 22.4190, lng: 114.2073 },
    { name: "New Asia College", lat: 22.4175, lng: 114.2060 },
    { name: "Shaw College", lat: 22.4215, lng: 114.2080 },
    { name: "Wu Yee Sun College", lat: 22.4160, lng: 114.2040 },
    { name: "Lee Woo Sing College", lat: 22.4165, lng: 114.2085 },
    { name: "S.H. Ho College", lat: 22.4155, lng: 114.2095 },
    { name: "Morningside College", lat: 22.4145, lng: 114.2050 },
    { name: "CW Chu College", lat: 22.4135, lng: 114.2065 },
    { name: "CUHK Central Plaza", lat: 22.4180, lng: 114.2060 }, # A central reference point
    { name: "University Station", lat: 22.4150, lng: 114.2090 }  # MTR Station
  ]
  locations_list.each do |loc|
    Location.find_or_create_by(name: loc[:name]) do |location|
      location.latitude = loc[:lat]
      location.longitude = loc[:lng]
    end
  end
end