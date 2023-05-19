import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {BsSearch} from "react-icons/bs";

const SearchRecipe = () => {
    const [input, setInput] = useState("");
    const [results, setResult] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/search/" + input);
    };


    return (
  
        <form onSubmit={submitHandler} className="searchForm">
            <div className="searchDiv">
                <BsSearch></BsSearch>
                <input onChange={(e) => setInput(e.target.value)} type="text" value={input} className="searchInput"/>
            </div>
        </form>

    );
}

export default SearchRecipe;
