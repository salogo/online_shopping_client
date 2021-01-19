import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem } from "./cartHelpers";


const Cart = ({ product, showViewProductButton = true, showAddToCartButton = true }) => {
  const [redirect, setRedirect] = useState(false)

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

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Card
        </button>
      )
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
      <span className="btn btn-success mt-2 mb-2">In Stock </span>
    ) : (
        <span className="btn btn-danger mt-2 mb-2">Out of Stock </span>
      );
  };


  return (

    <div className="card tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5" style={{ borderRadius: "7%" }}>
      <div className="card-header name ">{product.name}</div>
      <div className="card-body" >

        {shouldRedirect(redirect)}

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

        {showAddToCart(showAddToCartButton)}

      </div>
    </div>

  )
}

export default Cart;