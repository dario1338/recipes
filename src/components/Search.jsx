import React from "react";

const Search = ({getSearch, value, updateSearch, filterHandler}) => {
    return (
        <form onSubmit={getSearch}>
            <input type="text" className="recipe-input" value={value} onChange={updateSearch}/>
            <button className="recipe-button">Search</button>
            <div className="select">
                <select onChange={filterHandler} className="filter-recipe">
                    {/* <option value="none"></option> */}
                    <option value="All">All</option>
                    <option value="Desert">Desert</option>
                    <option value="Jelo">Jela</option>
                    <option value="Salata">Salate</option>
                </select>
            </div>
        </form>
    );
}

export default Search;
