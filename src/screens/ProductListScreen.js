import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
  }, [dispatch, createProduct, props.history, successCreate]);

  const deleteHandler = () => {
    // code for deleting goes here
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row">
        <h1> Products </h1>

        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th> ID </th>
              <th> NAME </th>
              <th> PRICE </th>
              <th> CATEGORY </th>
              <th> COLOR </th>
              <th> ACTIONS </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td> {product._id} </td>
                <td> {product.name} </td>
                <td> {product.price} </td>
                <td> {product.category} </td>
                <td> {product.color} </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
