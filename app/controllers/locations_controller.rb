class LocationsController < ApplicationController
  def index
    @locations = Location.all

    # Format data for Google Maps Data Layer (GeoJSON)
    @locations_json = @locations.map do |location|
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [ location.longitude, location.latitude ] # Note: [Lng, Lat] for GeoJSON
        },
        properties: {
          name: location.name,
          # You can add more details here to show in the popup
          link: location_path(location)
        }
      }
    end.to_json
  end

  def show
    @location = Location.find(params[:id])
  end
end
