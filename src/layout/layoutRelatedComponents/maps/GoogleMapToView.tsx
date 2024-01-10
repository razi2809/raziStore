import { FC, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@mui/material";
import { darkMapStyle, lightMapStyle } from "../../../mapStyles";

const GOOGLE_API_KEY = "AIzaSyBRE84tOscrelwgGKya3Z3SrQnFPGqD6XY";
interface Props {
  theme: "dark" | "light";
  address: { buildingNumber: number; street: string; city: string };
}
const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places", "maps", "marker"],
});

const GoogleMapToView: FC<Props> = ({ theme, address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const infoWindowInstanceRef = useRef<google.maps.InfoWindow | null>(null);
  useEffect(() => {
    const initMap = async () => {
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      const geocoder = new google.maps.Geocoder();

      const clientAddress = `${address.buildingNumber} ${address.street}, ${address.city}`;
      geocoder.geocode({ address: clientAddress }, (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            const location = results[0].geometry.location;
            const locationToJSON = location.toJSON();
            const mapOption: google.maps.MapOptions = {
              center: locationToJSON,
              zoom: 17,
              styles: theme === "dark" ? darkMapStyle : lightMapStyle,
              fullscreenControl: false,
              zoomControl: false,
              disableDefaultUI: true,
            };
            const map = new Map(mapRef.current as HTMLDivElement, mapOption);
            mapInstanceRef.current = map;
            const marker = new Marker({
              map: map,
              position: locationToJSON,
            });
            markerInstanceRef.current = marker;
            mapInstanceRef.current = map;
            const InfoWindow = new google.maps.InfoWindow({
              minWidth: 150,
              maxWidth: 200,
            });
            infoWindowInstanceRef.current = InfoWindow;
            const createInfoWindow = () => {
              marker.addListener(
                "click",
                function (event: google.maps.MapMouseEvent) {
                  const location = event.latLng;
                  const locationToJSON = event.latLng?.toJSON();
                  const infoWindowContent = `  <div >

                  <div>City: ${address.city}</div>
                  <div>Street Name: ${address.street}</div>
                  
                 <div>building Number: ${address.buildingNumber}</div></div>`;
                  if (location && locationToJSON) {
                    infoWindowInstanceRef.current?.setContent(
                      infoWindowContent
                    );
                    infoWindowInstanceRef.current?.open(
                      mapInstanceRef.current,
                      markerInstanceRef.current
                    );
                  }
                }
              );
            };
            google.maps.event.addListener(map, "dragstart", function () {
              infoWindowInstanceRef.current?.close();
            });
            marker.addListener("dragstart", function () {
              infoWindowInstanceRef.current?.close();
            });
            createInfoWindow();
          }
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };
    initMap();
  }, [theme, address]);

  return (
    <Box>
      <Box sx={{ height: "12em", borderRadius: 2, mb: 1 }} ref={mapRef}></Box>
    </Box>
  );
};

export default GoogleMapToView;
