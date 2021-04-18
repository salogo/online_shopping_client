import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getCategories, UpdateCategor, getCategory, } from "./apiAdmin";



const UpdateCategory = ({match}) => {
    const [values, setValues] = useState({ name: ""})
  
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructure user and token from localstorage
    const { name } = values
    console.log("naaame", name)
    const { user, token } = isAuthenticated();

    const init = categoryId => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setValues({ ...name, error: data.error });
            } else {
                console.log("CI... Id",categoryId)
                // populate the state
                setValues({
                    ...name,
                    name: data.name,
                });
                // load categories
                initCategories();
            }
        });
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...name, error: data.error });
            } else {
                setValues(data);
                console.log("dataaa", data)
            }
        });
    };

    useEffect(() => {
        init(match.params.categoryId);
    }, []);

     
     const handleChange = name => event => {
        const value =   event.target.value;
        setValues({ ...name, name: value });
    };

    
    const clickSubmit = (e) => {
      
        e.preventDefault()
        setError("")
        setSuccess(false)
        // then make the request to create the Category
        UpdateCategor(match.params.productId, user._id, token, {name}).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setValues({
                    name: ""
                })

                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />

            </div>
             
                <button className="btn btn-outline-primary">
                   Update Category
                </button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
             <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    );

    return (
        <Layout title="Create a Category" description={`Hello ${user.name}`} >
             
            <div className="row">
                <div className="col-md-8 offset-md-2">
                   {newCategoryForm()}
                   {showSuccess()}
                   {showError()}
                   {goBack()}
                </div>
            </div>

        </Layout>
    )


}
export default UpdateCategory;