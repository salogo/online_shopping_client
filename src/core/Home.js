import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Scroll from "./Scroll";
import shoppinglogo from "../images/shoppinglogo.jpg";


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsByArrival = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsBySell = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    const logo = () => {
        return (
            <div className="jumbotron bg-secondary sega" >
                <img
                    src={shoppinglogo}
                    alt="people"
                    style={{ height: "100%", width: "100%", }}
                />
            </div>
        )
    }

    return (
        <Layout title="" description="" className="container-fluid text-primary ">
            <Scroll>

                {logo()}

                <Search />

                <h2 className="mb-4">New Arrival</h2>
                <div className="row">
                    {productsByArrival.map((product, i) => (
                        <div key={i} className="col-4 mb-6">
                            <Card product={product} />
                        </div>
                    ))}
                </div>

                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map((product, i) => (
                        <div key={i} className="col-4 mb-6">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </Scroll>

        </Layout>
    )
};

export default Home;