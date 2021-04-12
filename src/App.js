import { BrowserRouter, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import cartSreen from "./screens/cartSreen";
import homeScreen from "./screens/homeScreen";
import productScreen from "./screens/productScreen";
import SigninScreen from "./screens/signinScreen";
import RegisterScreen from "./screens/registerScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/paymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from "./screens/ProductListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="gridContainer">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Da-Nile
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"> My Profile </Link>
                  </li>

                  <li>
                    <Link to="/orderhistory"> Order History</Link>
                  </li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signIn">Sign In</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin"> Admin </Link>{" "}
                <i className="fa fa-caret-down"></i>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"> Dashboard </Link>
                  </li>
                  <li>
                    <Link to="/productlist"> Products </Link>
                  </li>
                  <li>
                    <Link to="/orderlist"> Orders </Link>
                  </li>
                  <li>
                    <Link to="/userlist"> Dashboard </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={cartSreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/" component={homeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/product/:id" component={productScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen} exact></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>

          <AdminRoute
            path="/productList"
            component={ProductListScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">all rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
