import React from "react";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const SearchedRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    let params = useParams();


    useEffect(() => {
        if (params.search.length > 0) {
            fetch(`https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`).then(
                response => response.json()
            ).then(responseData => {
                setRecipes([])
                let searchQuery = params.search.toLowerCase();
                for (const key in responseData) {
                    let recipe = responseData[key].title.toLowerCase();
                    if (recipe.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                        setRecipes(prevRecipes => {
                            return [...prevRecipes, [key, responseData[key]]]
                        });
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            setRecipes([])
        }

    }, [params.search]);


    return (
        <div className="card-by-search">
            <div className="wrapper">
                {
                    recipes.map((recipe, index) => {
                        return (
                            <RecipeCard key={index} id={recipe[0]} title={recipe[1].title} picture={recipe[1].picture}></RecipeCard>
                        )
                    }) 
                }
            </div>
        </div>
    )
    
}

export default SearchedRecipe;
