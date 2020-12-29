import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { createProduct} from "./apiAdmin";


const AddProduct = () => {

const { user, token } = isAuthenticated();
//the state:
const [ values, setValues ] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createProduct: "",
    redirectToProfile: false,
    formData : ""

})
// distructure to use for the form or anywhere
const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData
} = values;

useEffect(() => {
    setValues({...values, formData: new FormData()})
},[])

const handleChange = name => event => {
// ternary operator if it s photo we grab the e.target.file else we grab the value 
    const value = name === "photo" ? event.target.file[0] : event.target.value
    formData.set(name, value)
    setValues({...value, [name]: value})   
};

const clickSubmit = event =>{
    //
};

const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
         <h4>Post Photo</h4>
         <div className="form-group">
            <label className="btn btn-outline-secondary">
            <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" />
            </label>
         </div>

         <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
         </div>

         <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange("description")} className="form-control" value={description} />
         </div>

         <div className="form-group">
            <label className="text-muted">Price</label>
            <input onChange={handleChange("name")} type="number" className="form-control" value={price} />
         </div>

         <div className="form-group">
         <label className="text-muted">Category</label>
         <select 
         onChange={handleChange("category")} 
         className="form-control" 
         >
             <option value="5fd00876fc90f23416e77153">node b</option>
         </select>
      </div>

      <div className="form-group">
      <label className="text-muted">Shipping</label>
      <select 
      onChange={handleChange("shipping")} 
      className="form-control" 
      >
          <option value="0">No</option>
          <option value="1">Yes</option>
      </select>
   </div>

      <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input onChange={handleChange("quantity")} type="text" className="form-control" value={quantity} />
         </div>

         <button className="btn btn-outline-primary">Create Product</button>
    </form>
);

    return (
        <Layout title="Add a new product" description={`Hello ${user.name}`} >
             
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )

}

export default AddProduct