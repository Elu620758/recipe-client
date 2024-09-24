import React, { useState } from 'react';
import './Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../http-common';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === '' || password === '') {
      setError('Required fields are missing');
      setLoading(false);
    } else {
      // Simulate successful login & backend logic)
      const postData = {
        email: email,
        password: password,
      };

      try {
        const res = await apiClient.post("/auth/login", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });
        //console.log(res)
        const user = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data.user,
          message: res.data.message
        };
        console.log(user);

        if (user.message === "Please check the credentials") {
          alert('Please check the credentials');
          setError("Please check the credentials");
        } else if (user.message === "not registered") {
          alert('Given Email Id Does not exist');
          setError("Given Email Id Does not exist");

        } else {
          alert('Logined in Successfully');
          localStorage.setItem("loginUserName", user.data.username);
          localStorage.setItem("EmailId", user.data.email);
          localStorage.setItem("UserId", user.data._id);

          // Set user details in the state (if a state is available)
          setUser({
            id: user.data._id,
            username: user.data.username,
            email: user.data.email,
          });
          navigate('/home');
        }

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);

      }
    }
  };

  return (
    <div className="auth-login">
      <div className="auth-container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-feild">
          <button onClick={handleLogin} disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div>
          <p
            onClick={() => navigate('/register')}
            style={{
              marginTop: '10px',
              textAlign: 'center',
              color: '#0095ff',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            Don't have an account? Register
          </p>
        </div>
        <p
          onClick={() => navigate('/forgot-password')}
          style={{
            marginTop: '10px',
            textAlign: 'center',
            color: '#0095ff',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          Forgot Password?
        </p>

        {error !== '' && (
          <p
            style={{
              color: 'red',
              fontSize: '14px',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
