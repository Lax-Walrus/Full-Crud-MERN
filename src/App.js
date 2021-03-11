import react from "react";
import data from "./data";
import Product from "./components/Product";

function App() {
  return (
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
        <div className="row center">
          {data.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
          ;
        </div>
      </main>
      <footer className="row center">all rights reserved</footer>
    </div>
  );
}

export default App;
