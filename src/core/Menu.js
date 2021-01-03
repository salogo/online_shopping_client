import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

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
          Home
         </Link>
      </li>

           
      <li className="nav-item">
      <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
        Shop
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