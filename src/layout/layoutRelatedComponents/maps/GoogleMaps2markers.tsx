import { FC, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@mui/material";
import { darkMapStyle, lightMapStyle } from "../../../mapStyles";

const GOOGLE_API_KEY = "AIzaSyBRE84tOscrelwgGKya3Z3SrQnFPGqD6XY";
interface Props {
  theme: "dark" | "light";
  clientLocation: { buildingNumber: number; street: string; city: string };
  businessLocation: { buildingNumber: number; street: string; city: string };
}
const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places", "maps", "marker"],
});

const GoogleMaps2markers: FC<Props> = ({
  theme,
  clientLocation,
  businessLocation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      const geocoder = new google.maps.Geocoder();
      const clientAddress = `${clientLocation.buildingNumber} ${clientLocation.street}, ${clientLocation.city}`;
      const businessAdress = `${businessLocation.buildingNumber} ${businessLocation.street}, ${businessLocation.city}`;
      let map: google.maps.Map;
      const geocodeAddress = (address: string) =>
        new Promise<google.maps.LatLng>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === "OK") {
              if (results && results[0]) {
                resolve(results[0].geometry.location);
              } else {
                reject(new Error("No results found"));
              }
            } else {
              reject(
                new Error(
                  `Geocode was not successful for the following reason: ${status}`
                )
              );
            }
          });
        });

      const [locationOfClient, locationOfBusiness] = await Promise.all([
        geocodeAddress(clientAddress),
        geocodeAddress(businessAdress),
      ]);
      const mapOption: google.maps.MapOptions = {
        center: locationOfClient.toJSON(),
        zoom: 12,
        styles: theme === "dark" ? darkMapStyle : lightMapStyle,
        fullscreenControl: false,
        zoomControl: false,
        disableDefaultUI: true,
      };

      map = new Map(mapRef.current as HTMLDivElement, mapOption);
      mapInstanceRef.current = map;

      new Marker({
        map: map,
        position: locationOfClient.toJSON(),
        draggable: false,
      });

      new Marker({
        map: map,
        position: locationOfBusiness.toJSON(),
        draggable: false,
      });

      if (locationOfClient && locationOfBusiness) {
        const midLat = (locationOfClient.lat() + locationOfBusiness.lat()) / 2;
        const midLng = (locationOfClient.lng() + locationOfBusiness.lng()) / 2;
        map.setCenter(new google.maps.LatLng(midLat, midLng));
      }
    };
    initMap();
  }, [theme, clientLocation]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{ height: "100%", width: "100%", borderRadius: 2, mb: 1 }}
        ref={mapRef}
      ></Box>
    </Box>
  );
};

export default GoogleMaps2markers;
