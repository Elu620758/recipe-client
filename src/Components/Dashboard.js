import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import './Styles/Dashboard.css'

const API_BASE_URL = 'https://recipe-server-wtws.onrender.com'; // Change this to your actual base URL

function Dashboard({user}) {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([])
    const userId = localStorage.getItem('UserId')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/recipe/getrecipe/${userId}`
                );
                setRecipes(response.data)
                //console.log(response.data)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {

        try {
            const res = await axios.delete(
                `${API_BASE_URL}/recipe/delete-recipe/${id}`
            );

            const response = await axios.get(
                `${API_BASE_URL}/recipe/getrecipe/${userId}`
            );
            setRecipes(response.data)

            // console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    }
    //   console.log(recipes) 

    return (
        <div className="container-dashboard">
            <Navbar />
            <h2>Welcome {user?.username} </h2>
            <div className="home-receipe">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="card">
                        <div>
                            <h2>{recipe.name}</h2>
                            <div className="btn" >
                                <button onClick={() => navigate(`/edit/${recipe._id}`)}
                                >Edit </button>
                                <button onClick={() => {
                                    handleDelete(recipe._id)
                                }}>Delete</button>
                            </div>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <div className="card" ><img src={recipe.imageUrl} alt={recipe.name} /></div>
                        <p>Cooking Time: {recipe.cookingTime} minutes</p>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Dashboard