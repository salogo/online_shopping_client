import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { read, listRelated, createReview, readReview } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth/index";


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [hoverRating, setHoverRating] = React.useState(0);
    const [getreviews, setGetreviews] = useState([]);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { user: {  name } } = isAuthenticated();
    const token = isAuthenticated().token;
    
   // const [nameValue, setnameValue] = useState({ nameValue: name })

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }

    // Reviews
    function StarIcon(props) {
        const { fill = 'none' } = props;
        return (
            <div style={{
                height: "100vh", margin: "0", display: " grid",
                width: "1.5em", height: "1.5em"

            }}>
                <div style={{}}>
                    <svg class="w-6 h-6"
                        fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </div>

            </div>
        );
    }

    function RatingIcon(props) {
        const { index, rating, hoverRating, onMouseEnter, onMouseLeave, onSaveRating, } = props;
        const fill = React.useMemo(() => {
            if (hoverRating >= index) {
                return 'yellow';
            } else if (!hoverRating && rating >= index) {
                return 'yellow';
            }
            return 'none';
        }, [rating, hoverRating, index]);
        return (
            <div className="cursor-pointer" style={{ cursor: "pointer" }} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()} onClick={() => onSaveRating(index)}>
                <StarIcon fill={fill} />
            </div>
        )
    }

    const onMouseEnter = (index) => {
        setHoverRating(index);
    };
    const onMouseLeave = () => {
        setHoverRating(0);
    };
    const onSaveRating = (index) => {
        setRating(index);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const productId = props.match.params.productId

        setComment({ ...comment, comment: e.target.comment })
        setRating({ ...rating, rating: rating }) 
  
       const review = { rating, comment, name }
       console.log("review", review)
        createReview(productId, review)
  /*   .then(data => {
           if (data.error) {
                console.log("ERROR...",data.error)
            }  
        })   */
    };

    const commentInput = () => {
        return (
            <form >
                <Fragment>
                    <div>
                        <label htmlFor="comment">Comment..</label>
                        <textarea id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label />
                        <button onClick={submitHandler} className="primary" type="submit">
                            Submit
        </button>
                    </div>
                </Fragment>
            </form>
        )
    }

    useEffect(() => {
        const productId = props.match.params.productId // from the URL
        loadSingleProduct(productId)
        setRating('');
        setComment('');
    }, [props])// [props] mean anytime there a change useEffect will update the state

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}

                    <Fragment>
                        <div className="box flex " style={{ display: "flex", width: "22px", height: "5px" }} >
                            {[1, 2, 3, 4, 5].map((index) => {
                                return (
                                    <RatingIcon index={index} rating={rating} hoverRating={hoverRating} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onSaveRating={onSaveRating} />
                                )
                            })}
                        </div> <br />

                        {commentInput()}
                    </Fragment>

                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>

            </div>

        </Layout>
    )
}

export default Product;