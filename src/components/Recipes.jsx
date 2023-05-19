import {useState, useEffect} from "react";
import RecipeCard from "./RecipeCard";

function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getAllRecipes();
    }, []);

    const getAllRecipes = async () => {
            const response = await fetch(
                `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`
             );
            const data = await response.json();
            console.log(data);
            const res = [];
            for(let i in data) {
                res.push([i, data[i]]);
            }
            setRecipes(res);
            // console.log(res);
    };
    
    return (
        <div className="wrapper">
            {
                recipes.map((recipe) => {
                    return (
                        <div key={recipe[0]}>
                            <RecipeCard id={recipe[0]} title={recipe[1].title} picture={recipe[1].picture}></RecipeCard>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Recipes;
