import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function RecipesByCategory() {
    const [recipes, setRecipes] = useState([]);
    let params = useParams();
    
    const getRecipesByCategory = async (category) => {
        const response = await fetch(
            `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?orderBy="category"&equalTo="${category}"`
            );
        const data = await response.json();
        const res = [];
        for(let i in data) {
              res.push([i, data[i]]);
        }
        setRecipes(res);
    }

    useEffect(() => {
        getRecipesByCategory(params.type);
    }, [params.type]);

    return (
        <div className="card-by-category">
            <div className="wrapper">
                {
                    recipes.map((recipe) => {
                        return (
                            <div key={recipe[0]}>
                            <RecipeCard id={recipe[0]} title={recipe[1].title} picture={recipe[1].picture}></RecipeCard>
                            </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}

export default RecipesByCategory;
