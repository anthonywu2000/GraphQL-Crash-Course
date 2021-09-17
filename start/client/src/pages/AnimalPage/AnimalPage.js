import React from 'react'
import { Container } from 'react-bootstrap'
import animals from "../../assets/images"
import star from "../../assets/svg/star.svg"
import "./AnimalPage.css"
import { useParams } from "react-router-dom" // get the slug or the endpoint of a page
import { gql, useQuery } from "@apollo/client";

const FETCH_ANIMAL_DATA = gql`
  query($slug: String!) {
     animal(slug: $slug) {
        slug
        image
        description
        title
        price
        stock
        rating
     } 
  }
`;


function AnimalPage() {

    const { slug } = useParams();

    const { loading, error, data } = useQuery(FETCH_ANIMAL_DATA, {
        variables: {
            slug: slug
        }
    });

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>Some error happened. Perhaps 404 not found...</div>
    }

    return (
        <div className="py-5">
            <Container>
                <div className="d-flex">
                    <img className="product-img"  style={{marginRight: "1rem"}} src = {animals[data.animal.image ? data.animal.image : null]}/>
                <div className="text-container">
                        <h1>{data.animal.title}</h1>
                        <div className="star-container">
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <div className="rating-stock-container">
                                <p>{data.animal.rating ? data.animal.rating : 0} rating</p>
                                <p>{data.animal.stock} in stock</p>
                            </div>
                            
                        </div>
                        <div className="about-container">
                            <h4>About this Animal</h4>
                            {/*<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>*/}
                            {/*<li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>*/}
                            {/*<li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>*/}
                            {/*<li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>*/}
                            {data.animal.description.map((description) => {
                                return <li>{description}</li>
                            })}
                        </div>
                    </div>
                    <div className="cart-container border">
                        <p className="price"><span>CAD$ {data.animal.price}</span></p>
                        <p className="delivery-time" >FREE delivery: Thursday, Feb 25 Details
                            <button className="buy-now-btn" style={{marginTop: "2rem"}}>
                                Add to Cart
                            </button>
                            <button>
                                Buy Now
                            </button>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AnimalPage
