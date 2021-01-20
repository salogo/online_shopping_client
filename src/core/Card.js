import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";


const Cart = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true ,
  cartUpdate = false,
  showRemoveProductButton =false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount ] = useState(product.count);


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

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button onClick={() => removeItem(product._id)}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };


  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="btn btn-success mt-2 mb-2">In Stock </span>
    ) : (
        <span className="btn btn-danger mt-2 mb-2">Out of Stock </span>
      );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div> 
        <div className="input-group mb-3">
         <div className="input-group-prepend">
           <span className="input-group-text">Adjust Quantity</span>
         </div>
         <input 
          type="number"
           className="form-control" 
           value={count} 
           onChange={handleChange(product._id)} 
           />
        </div>
    </div>
  }


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

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>

  )
}

export default Cart;