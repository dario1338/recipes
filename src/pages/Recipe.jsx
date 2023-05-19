import React from "react";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import RatingStar from "../components/RatingStar";
import CommentBox from "../components/CommentBox";
import ReactPlayer from "react-player";

const Recipe = () => {
    let params = useParams();
    const [recipe, setRecipe] = useState({});
    const [activeTab, setActiveTab] = useState("ingredients");
    const [listIngredients, setListIngredients] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        // setTimeout(() => {fetchRecipeById()}, 1000);
        const fetchRecipeById = async () => {
            const response = await fetch(
                `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/recipes/${params.id}.json`
                );
            const data = await response.json();
            console.log(data);
            setRecipe(data);
            setVideoUrl(data.video);
        } 
        fetchRecipeById();
    },[params.id]);

    useEffect(() => {
        setListIngredients(recipe.ingredients);
    }, [recipe]);

    return (
        <>
        <div className="container-img-comments">
            <h2>{recipe.title}</h2>
            <img src={recipe.picture} alt="" /> 
            <RatingStar id={params.id}></RatingStar>
            <CommentBox id={params.id}></CommentBox>
        </div>
        <div className="container-video-ing-prep">
            <div className="detailsInfoAndVideo">
                <ReactPlayer url={videoUrl} width="640px" height="360px" muted={true} controls={true}/>

                <div className="detailsInfo">                
                    <button className={activeTab === "ingredients" ? "detailsButtonActive" : "detailsButtonInactiv"}
                         onClick={() => setActiveTab("ingredients")}>Sastojci</button>
                    <button className={activeTab === "preparation" ? "detailsButtonActive" : "detailsButtonInactiv"} 
                         onClick={() => setActiveTab("preparation")}>Priprema</button>
     {/* {activeTab === "ingredients" ? "active" : ""} */}  

     {activeTab === "ingredients" && (
         <ul>
           {listIngredients?.map((item, index) => {
            console.log(item);
           return <li key={index}>{item}</li>
           })}
           {/* {console.log(recipe.ingredients)} */}
        
        </ul>
    )}
    {activeTab === "preparation" && (
        <ul>
            <li>{recipe.preparation}</li>
        </ul>
    )}               
</div>
</div>
        </div>
        </>
    );

}

export default Recipe;
