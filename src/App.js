import { BrowserRouter, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import cartSreen from "./screens/cartSreen";
import homeScreen from "./screens/homeScreen";
import productScreen from "./screens/productScreen";
import SigninScreen from "./screens/signinScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
            <Link to="/signIn">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={cartSreen}></Route>
          <Route path="/" component={homeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/product/:id" component={productScreen}></Route>
        </main>
        <footer className="row center">all rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
