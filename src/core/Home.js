import React, { useState, useEffect, Fragment } from "react";
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

const arrival = () => {

   return <div className="row">
    <h2 className="mb-4">New Arrival</h2> 

        {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-6">
                <Card product={product} />
            </div>
        ))}
    </div>
        }
const best_sellers = () => {
    return  <Fragment>  <h2 className="mb-4">Best Sellers</h2>
    <div className="row">
        {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-6">
                <Card product={product} />
            </div>
        ))}
    </div>
    </Fragment>
}        
    return (
        <Layout title="" description="ZAKARIA SALOGO FULL STACK DEVELOPER" className="container-fluid text-primary ">
            <Scroll>

                {logo()}

                <Search />

                    {!arrival() ? "Loding..." : arrival() }
                    {!best_sellers()? "Loding..." : best_sellers()}            

            </Scroll>

        </Layout>
    )
};

export default Home;