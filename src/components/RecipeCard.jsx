import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
 


      return (
        <div className="card">
            <div className="card__body">
                {/* <Link to={"/recipe/" + props.id}> */}
                <img src={props.picture} className="card__image"/>
                <h2 className="card__title">{props.title}</h2>
                {/* </Link> */}
            </div> 
            <Link to={"/recipes/" + props.id}>
                <div>
                    <button className="card__btn">View Recipe</button>
                </div>
            </Link>
        </div>
    );

}

export default RecipeCard;
