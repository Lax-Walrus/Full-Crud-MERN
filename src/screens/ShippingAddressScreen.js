import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [zipCode, setZipCode] = useState(shippingAddress.ZipCode);
  const [state, setState] = useState(shippingAddress.state);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }

    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You didn't set your location. Continue anyways? "
      );
    }

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          zipCode,
          state,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        zipCode,
        state,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName"> Full Name </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address"> address </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city"> City </label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="state"> State </label>
          <input
            type="text"
            id="state"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="zipCode"> Zip Code </label>
          <input
            type="text"
            id="zipCode"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap"> Location </label>
          <button type="button" onClick={chooseOnMap}>
            Choose on Map
          </button>
        </div>
        <div>
          <label>
            <button className="primary" type="submit">
              Continue
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}
