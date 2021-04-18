import { API } from "../config";



export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  };

  export const signin = user => {
    // console.log(name,email, password);
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }; 

  // save user info(token) in local storage
  export const authenticate = (data, next) => {
      if(typeof window !== "undefined") {
          //save the data by name : "jwt"
          localStorage.setItem("jwt", JSON.stringify(data))
          next()
      }
  }

  
  export const signout = (next) => {
      if (typeof window !== "undefined") {
          localStorage.removeItem("jwt");// clear the local storage = remove token from local storage
          next();
          //then request to the backend to logout 
          return fetch(`${API}/signout`, {
              method: "GET",
          })
          .then(response => {
              console.log("signout", response)
          })
          .catch(err => console.log(err))
      }
  }


// use isAutenticated to hide signup and signin when YOU ARE login or hide signout if not loged in
  export const isAuthenticated = () => {
      if(typeof window == "undefined") {
          return false;
      }
      if(localStorage.getItem("jwt")) {
          return JSON.parse(localStorage.getItem("jwt"));
      } else {
          return false;
      }
  };

 
