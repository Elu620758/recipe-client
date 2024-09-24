import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import './Styles/Home.css'
import { Alert, Snackbar } from "@mui/material";

const API_BASE_URL = 'https://recipe-server-wtws.onrender.com'; // Change this to your actual base URL

  const Home = ({ user, setUser }) => {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem("UserId");

  useEffect(() => {

    //console.log(userId)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipe`);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
    // fetchSavedRecipes();
  }, [userId]);


  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/update`, {
        recipeID,
        userId,
      });

      handleClick()
      //console.log(response)
      setUser(response.data.updatedRecipe)
    } catch (err) {
      console.log(err);
    }
  };


  //Snackbar
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Recipes</h1>
        <div className="home-receipe">
        <ul className="card-container">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="card">
              <div>
                <h2>{recipe.name}</h2>
                <div className="btn" >
                  <button
                    onClick={() => saveRecipe(recipe._id)}

                  >save </button></div>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <div class="card" ><img src={recipe.imageUrl} alt={recipe.name} /></div>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))}
          </ul>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"
          sx={{ width: '100%' }}>
          Recipe added to SavedRecipes
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;

