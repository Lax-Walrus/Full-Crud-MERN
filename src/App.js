// import react from "react";
import data from "./data";

function App() {
  return (
    <div className="gridContainer">
      <header className="row">
        <div>
          <a className="brand" href="index.html">
            Da-Nile
          </a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
        <div className="row center">
          {data.products.map((product) => (
            <div key={product._id} className="card">
              <a href={`/product/${product._id}`}>
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
              </a>
              <div className="card-body">
                <a href={`/product/${product._id}`}>
                  <h2> {product.name}</h2>
                </a>
              </div>
              <div className="rating">
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
              </div>
              <div class="price">${product.price}</div>
            </div>
          ))}
          ;
        </div>
      </main>
      <footer className="row center">all rights reserved</footer>
    </div>
  );
}

export default App;
