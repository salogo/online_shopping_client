import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken, processPayment } from "./apiCore";
import Card from "./Card";
import { emptyCart } from "./cartHelpers";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import Dropin from "braintree-web-drop-in-react";




const Checkout = ({ products, setRun = f => f, run = undefined  }) => {
    const [ data, setData ] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            } else {
                setData({ clientToken: data.clientToken})
            }
        });
    };

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            )
    }
//
function refreshPage() {
    window.location.reload(false);
  }

    const buy = () => {
        setData({ loading: true});
        //send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        // you can use this sample to test pay: 4111 1111 1111 1111 and any futur date 11/22
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
           // console.log(data);
            nonce =data.nonce;
            //once you have nonce (card type, card number) send nonce as "paymentMethodNonce"
            //and also total to be charged
           // console.log("send nonce and total to process:", nonce, getTotal(products))
           const paymentData = {
               paymentMethodNonce: nonce,
               amount: getTotal(products)
           }
           processPayment(userId, token, paymentData)
           .then(response => {
              // console.log(response) 
              setData({...data, success: response.success});
              // empty cart
              emptyCart(() => {
                setRun(!run); // run useEffect in parent Cart
                
                console.log('payment success and empty cart');
                setData({loading: false});
            })
            // to refrech the page after the cart has been emptied
            refreshPage()
              // create order

           })
           .catch(error => {
            console.log(error)
            setData({loading: false});
           });
        })
        .catch(error => {
           // console.log("dropin error:", error)
            setData({...data, error: error.message});
        });
    };
    



    const showDropIn = () => (
        // to hide last error message when typing we use in the div onBlur={....}
        <div onBlur={() => setData({...data, error: ""})}>
          {data.clientToken !== null && products.length > 0 ? (
              <div>
                  <Dropin 
                     options={{
                       authorization: data.clientToken,
                       paypal: {
                           flow: "vault"
                       }
                  }} 
                  onInstance={instance => (data.instance = instance)}/>
                  <button onClick={buy}  className="btn btn-success btn-block">Pay</button>
              </div>
          ) : null}
        </div>
    )

    const showError = error => (
       <div className="alert alert-danger" style={{display: error ? "":"none"}}>
          {error}
       </div>
       );

       const showSuccess = success => (
        <div className="alert alert-success" style={{display: success ? "":"none"}}>
           Thanks for your payment!
        </div>
        );

        const showLoading = loading =>  loading && <h2>Loading...</h2>;
    

    return <div>
     
        <h2>Total: ${getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}  
        {showError(data.error)} 
        {showCheckout()}
       
    </div>

};

export default Checkout;