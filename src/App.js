import react from "react";
import data from "./data";
import Product from "./components/Product";
import { BrowserRouter, Route } from "react-router-dom";
import homeScreen from "./screens/homeScreen";
import productScreen from "./screens/productScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="gridContainer">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Da-Nile
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signIn">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" component={homeScreen} exact></Route>
          <Route path="/product/:id" component={productScreen}></Route>
        </main>
        <footer className="row center">all rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
