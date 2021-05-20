import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/rating";

import { prices, ratings } from "../utils";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    products: categories,
  } = productCategoryList;

  const getFilterURL = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : min;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, name, min, max, rating, order]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}

        <div> Sort by {""}</div>
        <select
          value={order}
          onChange={(e) => {
            props.history.push(getFilterURL({ order: e.target.value }));
          }}
        >
          <option value="newest"> Newest Arrivals</option>
          <option value="lowest"> Lowest Price</option>
          <option value="highest"> Highest Price</option>
          <option value="toprated"> Top Rated</option>
        </select>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3> Department </h3>
          <div>
            {loadingCategory ? (
              <LoadingBox></LoadingBox>
            ) : errorCategory ? (
              <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={"all" === category ? "active" : ""}
                    to={getFilterURL({ category: "all" })}
                  >
                    any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? "active" : ""}
                      to={getFilterURL({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterURL({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterURL({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              <>
                {products.length === 0 && (
                  <MessageBox> No Products Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
