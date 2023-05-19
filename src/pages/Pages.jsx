import React from "react";
import Home from "./Home";
import Recipe from "./Recipe";
import { Route, Routes, Router } from "react-router-dom";
import RecipesByCategory from "./RecipesByCategory";
import SearchedRecipe from "./SearchedRecipe";
import Register from "../components/Register";
import Login from "../components/Login";
import AddRecipe from "../components/AddRecipe";

function Pages() {
    return (
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/category/:type" element={<RecipesByCategory/>} />
                <Route path="/search/:search" element={<SearchedRecipe/>} />
                <Route path="/recipes/:id" element={<Recipe/>} />
                <Route path="/signup" element={<Register/>} />
                <Route path="/signin" element={<Login/>} />
                <Route path="/add-recipe" element={<AddRecipe/>} />
            </Routes>        
    );
}

export default Pages;
