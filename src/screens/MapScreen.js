import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import LoadingBox from "../components/LoadingBox";
import Axios from "axios";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";
import { useDispatch } from "react-redux";

const libs = ["places"];
const defaultLocation = { lat: 48.7519, lng: 122.4787 };

export default function MapScreen() {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await Axios("/api/config/google");
      console.log(data);
      setGoogleApiKey(data);
      getUserCurrentLoaction();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onIdle = () => {
    setLocation({ lat: mapRef.current.center.lat() });
    setLocation({ lng: mapRef.current.center.lng() });
  };

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
  };

  const dispatch = useDispatch();

  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      //   dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });

      alert("location selected successfully!");
    } else {
      alert("Please enter your address!");
    }
  };

  const getUserCurrentLoaction = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        ></GoogleMap>
        <StandaloneSearchBox
          onLoad={onLoadPlaces}
          onPlacesChanged={onPlacesChanged}
        >
          <div className="map-input-box">
            <input type="text" placeholder="Enter Your Address">
              <button
                type="button"
                className="Primary"
                onClick={onConfirm}
              ></button>
            </input>
          </div>
        </StandaloneSearchBox>
        <Marker position={location} onLoad={onMarkerLoad}></Marker>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}
