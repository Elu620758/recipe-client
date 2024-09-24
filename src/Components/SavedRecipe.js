import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import './Styles/SavedRecipe.css'


const API_BASE_URL = 'https://recipe-server-wtws.onrender.com'; // Change this to your actual base URL

const SavedRecipes = () => {
  const [users, setUsers] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const Id = localStorage.getItem('UserId');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, recipesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/users/user/${Id}`),
          axios.get(`${API_BASE_URL}/recipe`)
        ]);
        setUsers(userResponse.data[0]);
        //console.log(userResponse.data[0])
        setRecipe(recipesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, []);
  //console.log(users,recipe)
  useEffect(() => {
    if (users && recipe.length > 0) {
      const temp = users.savedRecipes;
      const filteredRecipes = recipe.filter(recipeItem => temp.includes(recipeItem._id));
      setSavedRecipes(filteredRecipes);
    }
  }, [users, recipe]);
  return (
    <div>
      <Navbar />
      <div className="saved-recipe">
        <h1>Saved Recipes</h1>
        <ul className="card-container">
          {savedRecipes && savedRecipes.map((recipe) => (
            <li className="card" key={recipe._id} >
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <p>{recipe.description}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedRecipes;
