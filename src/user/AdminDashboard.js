import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const { user: {/*_id,*/ name, email, rol } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card border-primary">
                <h4 className="card-header text-primary">Admin Settings</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                      </Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                    </Link>
                    </li>

                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5  text-primary border-primary">
                <h3 className="card-header ">User Profile</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{rol === 1 ? "Admin" : "Admin"}</li>
                </ul>
            </div>
        )
    }


    return (
        <Layout title="Dashboard" description={`Hello ${name}`} className="container-fluid">
            <div className="row ">
                <div className="col-3 ">
                    {adminInfo()}
                </div>
                <div className="col-9 text-primary">
                    {adminLinks()}
                </div>
            </div>


        </Layout>
    );
};
export default AdminDashboard;