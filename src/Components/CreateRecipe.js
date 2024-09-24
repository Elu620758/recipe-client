import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from '../http-common';
import './Styles/CreateRecipe.css'
import Navbar from '../Components/Navbar';
const CreateRecipe = ({ user }) => {
  //console.log(user);
  const userId = localStorage.getItem("UserId");
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const navigate = useNavigate();

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

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        userId: userId,

      };

      const res = await apiClient.post(`/recipe/${userId}`, recipe, postData, {
        headers: {
          "x-access-token": "token-value",
        },

      });
      //console.log(res)
      const user = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      //console.log(user);
      alert("Recipe Created Successfully!!!");
      navigate("/home");
    } catch (error) {
      console.log(error);

    }
  };

  return (

    <div>
      <Navbar user={user} />
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
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}

          <button className="add-button" type="button" onClick={handleAddIngredient}>
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

          <button className="add-button" type="submit">Create Recipe</button>

        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
