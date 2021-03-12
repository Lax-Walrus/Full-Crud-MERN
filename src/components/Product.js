import React from "react";
import Rating from "./rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2> {product.name}</h2>
        </a>

        <Rating rating={product.rating} numReviews={product.numReviews} />
      </div>

      <div className="row">
        <div className="resultCardStatus">
          {product.countInStock > 0 ? (
            <span className="success">In Stock</span>
          ) : (
            <span className="danger">Unavailable</span>
          )}
        </div>
      </div>

      <div class="price">${product.price}</div>
    </div>
  );
}
