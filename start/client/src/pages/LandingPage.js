import React from 'react'
import MainHero from "../components/MainHero/MainHero"
import CategoryDisplay from "../components/CategoryDisplay/CategoryDisplay"
import CardDisplay from "../components/CardDisplay/CardDisplay"
import { gql, useQuery, useMutation } from "@apollo/client";

const ADD_ANIMAL_MUTATION = gql`
mutation(
  $image: String!,
  $category: String!,
  $title: String!,
  $stock: Int!,
  $price: String!,
  $description: [String!]!
  $rating: Float
  $slug: String!
) {
  addAnimal(
    image: $image,
    category: $category,
    title: $title,
    stock: $stock,
    price: $price,
    description: $description,
    rating: $rating,
    slug: $slug,
  ) {
    id
  }
}
`


function LandingPage() {

    const FETCH_ANIMAL_DATA = gql`
        query {
            animals {
                title
                image
                id
                price
                slug
            } 
        }
    `;

    const { loading, error, data } = useQuery(FETCH_ANIMAL_DATA);
    const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>Some error happened. Perhaps 404 not found...</div>
    }

    return (
        <div>
            <MainHero />
            <CategoryDisplay />
            <CardDisplay animals={data.animals}/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => {
                    addAnimal({variables: {
                            image: "ostrich",
                            category: "1",
                            title: "This is a really cool ostrich",
                            stock: 13,
                            price: "32,333",
                            description: ["das"],
                            rating:3.5,
                            slug: "ostrich",
                        }
                    })
                }}>
                    Add an Ostrich!
                </button>
            </div>

        </div>
    )
}

export default LandingPage
