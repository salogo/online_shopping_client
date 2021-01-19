import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./cartHelpers";



const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#006400" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  //history is a props destructured = props.history
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">

          {/*  home icon*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
          </svg>
          {" "}
Home
         </Link>
      </li>


      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
          Shop
       </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
          {/*  Cart icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>

          {" "}
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
            Dashboard
         </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
            Dashboard
         </Link>
        </li>
      )}

      {/* 
       if user is not sAuthenticated we are showing signin and signup
    */}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
              Signin
           </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
              Signup
           </Link>
          </li>

        </Fragment>
      )}

      {/* 
       if user is  sAuthenticated we are showing sigout
    */}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() => signout(() => {
              history.push("/")
            })}>
            Signout
         </span>
        </li>
      )}

    </ul>
  </div>
)

export default withRouter(Menu);
