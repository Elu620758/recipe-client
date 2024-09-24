import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from '../http-common';
import './Styles/CreateRecipe.css'
import Navbar from '../Components/Navbar';
import axios from "axios";

const API_BASE_URL = 'https://recipe-server-wtws.onrender.com'; // Change this to your actual base URL



const EditRecipe = ({ user }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("UserId");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [recipe, setRecipe] = useState({})
  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await axios.get(
          `${API_BASE_URL}/recipe/recipe-by-id/${id}`
        );
        //setData(response.data.data[0])  
        setRecipe({
          name: response.data.data[0].name,
          description: "",
          ingredients: response.data.data[0].ingredients,
          instructions: response.data.data[0].instructions,
          imageUrl: response.data.data[0].imageUrl,
          cookingTime: response.data.data[0].cookingTime,
          userOwner: response.data.data[0].userId,
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();


  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  //console.log(recipe)

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.put(
        `${API_BASE_URL}/recipe/editrecipe`, {
        id, rec: recipe
      }
      );
      //console.log(response.data)

      alert("Recipe Edited Successfully!!!");
      navigate("/dash");
    } catch (error) {
      console.log(error);

    }
  };

  return (

    <div>
      <Navbar />
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form className="form-group" onSubmit={handleSubmit}>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></input>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}

          <button className="add-button" type="button" onClick={handleAddIngredient} >
            Add Ingredient
          </button>

          <label htmlFor="instructions">Instructions</label>
          <input
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></input>
          <label htmlFor="imageUrl">Image URL</label>

          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button className="add-button" type="submit">Edit Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
