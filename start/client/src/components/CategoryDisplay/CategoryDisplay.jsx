import React, { useState } from 'react'
import "./CategoryDisplay.css"
import { Container } from 'react-bootstrap'
import animals from '../../assets/images'
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom"


function CategoryDisplay() {

    const FETCH_CATEGORY_DATA = gql`
       query {
           categories {
                slug
                image
                category
           } 
       }
    `;

    const { loading, error, data } = useQuery(FETCH_CATEGORY_DATA);

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>Some error happened. Perhaps 404 not found...</div>
    }

    return (
        <div className="CategoryDisplay">
            <Container className="CategoryDisplay-container">
                {data.categories.map(category => {
                    return (
                        <Link to={`/products/${category.slug}`} className="CategoryDisplay-card-container">
                            <div className="CategoryDisplay-card">
                                <img src={animals[category.image]} />
                            </div>
                            <h3>{category.category}</h3>
                        </Link>
                    )
                })}
            </Container>
        </div>
    )
}

export default CategoryDisplay
