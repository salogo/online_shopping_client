import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";


const ManageCategories = () => {
  const [data, setData] = useState({
    categories: []  
});

const { categories } = data;

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const loadCategories = () => {
      getCategories().then(data => {
          if (data.error) {
              console.log(data.error)
          } else {
              setData({ ...data, categories: data })
          }
      })
  }

      const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
           loadCategories();
          }
        });
      };

   

      useEffect(() => {
        loadCategories();
      }, []);
    
      return (
        <Layout
          title="Manage Categories"
          description="DELETE OR UPDATE CATEGORY !"
          className="container-fluid"
        >
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">
                Total {categories.length} category
                        </h2>
              <hr />
              <ul className="list-group">
                {categories.map((p, i) => (
                  <li
                    key={i}
                  >
    
                    <div className="card mb-4 bg-info">
                      <div className="card-header card-header-1 ">{p.name}</div>
                      <div className="card-body">

                      <Link to={`/admin/category/update/${p._id}`}>
                      <button
                        className="btn btn-outline-primary mb-2 mt-2 mr-2 ml-2"
                      >

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                        {" "}
                        Update
      </button>
                    </Link>
              
    
                        <button
                          type="button"
                          className="btn btn-danger "
                          onClick={() => destroy(p._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                          {" "}
                          Delete
      </button>
    
    
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <br />
            </div>
          </div>
        </Layout>
      );
    };
export default ManageCategories;