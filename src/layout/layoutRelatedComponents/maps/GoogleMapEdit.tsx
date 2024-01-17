import { FC, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box, useTheme } from "@mui/material";
import { ILocation } from "../../../@types/inputs";
import { darkMapStyle, lightMapStyle } from "../../../mapStyles";
import ReactSelect, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
  OptionProps,
} from "react-select";

type OptionType = { label: string; value: string };

const GOOGLE_API_KEY = "AIzaSyBRE84tOscrelwgGKya3Z3SrQnFPGqD6XY";
interface Props {
  getLocation: (location: ILocation) => void;
  theme: "dark" | "light";
}
const loader = new Loader({
  apiKey: GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places", "maps", "marker"],
});

const GoogleMapToEdit: FC<Props> = ({ getLocation, theme }) => {
  let buildingNumber = NaN;
  let street = "";
  let city = "";
  const pageTheme = useTheme();

  const mapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OptionType[]>([]);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const infoWindowInstanceRef = useRef<google.maps.InfoWindow | null>(null);
  useEffect(() => {
    const initMap = async () => {
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const clientLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const mapOption: google.maps.MapOptions = {
            center: clientLocation,
            zoom: 17,
            zoomControl: false,
            disableDefaultUI: true,
            styles: theme === "dark" ? darkMapStyle : lightMapStyle,
            fullscreenControl: false,
          };

          const map = new Map(mapRef.current as HTMLDivElement, mapOption);
          mapInstanceRef.current = map;
          const marker = new Marker({
            map: map,
            position: clientLocation,
            draggable: true,
          });
          markerInstanceRef.current = marker;
          const InfoWindow = new google.maps.InfoWindow({
            minWidth: 150,
            maxWidth: 200,
          });
          infoWindowInstanceRef.current = InfoWindow;
          reverseGeocode(clientLocation, false);

          const createInfoWindow = () => {
            marker.addListener(
              "click",
              function (event: google.maps.MapMouseEvent) {
                const location = event.latLng;
                const locationToJSON = event.latLng?.toJSON();

                if (location && locationToJSON) {
                  marker.setPosition(location);
                  reverseGeocode(locationToJSON, true);
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
          google.maps.event.addListener(
            map,
            "click",
            async function (event: google.maps.MapMouseEvent) {
              const location = event.latLng;
              const locationToJSON = event.latLng?.toJSON();

              if (location && locationToJSON) {
                marker.setPosition(location);
                reverseGeocode(locationToJSON, false);
              }
            }
          );
        });
      }
    };
    initMap();
  }, [theme]);
  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    (async () => {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }

          if (active) {
            const options = predictions!.map((prediction) => ({
              value: prediction.place_id,
              label: prediction.description,
            }));

            setOptions(options);
          }
        }
      );
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);
  const reverseGeocode = (
    location: google.maps.LatLngLiteral,
    openWindow: boolean
  ) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK") {
        if (results && results[0]) {
          const addressComponents = results[0].address_components;
          for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            switch (component.types[0]) {
              case "street_number":
                buildingNumber = +component.long_name;
                break;
              case "route":
                street = component.long_name;
                break;
              case "locality":
                city = component.long_name;
                break;
            }
          }
          if (openWindow) {
            const infoWindowContent = `<div>City: ${city}</div>
            <div>Street Name: ${street}</div>
            
           <div>building Number: ${buildingNumber}</div>`;
            infoWindowInstanceRef.current?.setContent(infoWindowContent);
            infoWindowInstanceRef.current?.open(
              mapInstanceRef.current,
              markerInstanceRef.current
            );
          } else {
            infoWindowInstanceRef.current?.close();
          }
          getLocation({
            buildingNumber,
            street,
            city,
          });
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };
  const handleOptionChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: selectedOption.label }, (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            const location = results[0].geometry.location;
            const locationToJSON = location.toJSON();
            // Update the map and marker with the new location
            mapInstanceRef.current?.setCenter(location);
            markerInstanceRef.current?.setPosition(location);
            reverseGeocode(locationToJSON, false);
          }
        }
      });
    }
  };
  const selectStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (
      base: CSSObjectWithLabel,
      props: ControlProps<{ value: string; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: pageTheme.palette.background.paper,
      color: pageTheme.palette.text.primary,
      borderColor: pageTheme.palette.divider,
      // Add other custom styles or overrides
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: pageTheme.palette.background.paper,
      // Add other custom styles or overrides
    }),
    option: (
      base: CSSObjectWithLabel,
      props: OptionProps<{ value: string; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: props.isFocused
        ? pageTheme.palette.action.hover
        : base.backgroundColor,
      color: props.isFocused ? pageTheme.palette.text.primary : base.color,
      // Add other custom styles or overrides for options
    }),
    // Define other style overrides as needed
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "80%", borderRadius: 2, mb: 1 }} ref={mapRef}></Box>

      <Box sx={{ width: "100%", height: "20%" }}>
        <ReactSelect
          options={options}
          styles={selectStyles}
          onInputChange={(value) => {
            setInputValue(value);
          }}
          closeMenuOnSelect={true}
          onChange={(selectedOption) => handleOptionChange(selectedOption)}
          //   styles={customStyles}
        />
      </Box>
    </Box>
  );
};

export default GoogleMapToEdit;
