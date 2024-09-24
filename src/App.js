import {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Error from './Pages/Error';
import CreateRecipe from './Components/CreateRecipe';
import SavedRecipe from './Components/SavedRecipe';
import Dashboard from './Components/Dashboard';
import EditRecipe from './Components/EditRecipe';

function App() {

  const [user, setUser] = useState(null);
   //console.log(user);


  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path = "/home" element = {<Home user={user} setUser={setUser}/>} />
        <Route path = "/dash" element = {<Dashboard user={user} setUser={setUser}/>} />
        <Route path = "/edit/:id" element = {<EditRecipe user={user} setUser={setUser}/>} />
        <Route path = "/" element = {<Login setUser={setUser}  />} />
        <Route path = "/register" element = {<Register  />} />
        <Route path = "/forgot-password" element = {<ForgotPassword />} />
        <Route path = "/reset-password" element = {<ResetPassword />} />
        <Route path = "/create-recipe" element = {<CreateRecipe user={user} />} />
        <Route path = "/saved-recipe" element = {<SavedRecipe user={user} setUser={setUser}/>} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
