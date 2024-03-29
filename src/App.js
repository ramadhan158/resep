import React, { useEffect, useState } from 'react';
import Recipe from './komponen/Recipe';
import './App.css';

const App = () => {
    const APP_ID = "6d8bf115";
    const APP_KEY = "bbb8c910fec640f25dd3f020541a0e41";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');

    useEffect(() => {
        getRecipes();
    },[query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('')
    }

    return(
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input placeholder="Masukan Menu Yang Ingin Anda Buat" className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Cari</button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (
                <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
                ))}
            </div>
        </div>
    )
};

export default App;
