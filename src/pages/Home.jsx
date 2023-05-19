import React from "react";
import Recipes from "../components/Recipes";
import SearchRecipe from "../components/SearchRecipe";


function Home() {
    return (
        <div>
            <SearchRecipe/>
            <Recipes/>
        </div>
    )
}

export default Home;
