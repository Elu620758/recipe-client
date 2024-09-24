import axios from "axios";

export default axios.create({
  baseURL: "https://recipe-server-wtws.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});

