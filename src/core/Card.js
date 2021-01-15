import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";


const Cart = ({ product, showViewProductButton = true }) => {

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )

    )
  }

  const showAddToCartButton = () => {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2">
        Add to Card
      </button>
    );
  };

  /*  
   const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };
  */

  const showStock = quantity => {
    return quantity > 0 ? (
      <span  className="btn btn-success mt-2 mb-2">In Stock </span> 
    ) : (
      <span  className="btn btn-danger mt-2 mb-2">Out of Stock </span>  
    );
  };
  

  return (

    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p>{product.description.substring(0, 100)}</p>
        <p>${product.price}</p>
        <p >
          Category: {product.category && product.category.name}
        </p>
        <p>
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartButton()}

      </div>
    </div>

  )
}

export default Cart;