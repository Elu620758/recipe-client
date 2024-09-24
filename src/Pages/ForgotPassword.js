import React, { useState } from 'react';
import apiClient from '../http-common';
import { useNavigate } from 'react-router-dom';
import './Styles/forgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
    } else {
      const postData = {
        email: email,
      };

      try {
        const res = await apiClient.post("/auth/forgot-password", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const user = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        // Handle the result here, you can update the state or display a success message

        console.log(user);
      } catch (err) {
        setError(err.response?.data || err.message); // Log the error message here
      }

      setLoading(false);
      navigate('/reset-password'); // Redirect to the home page after successful login
    }
  };

  return (
    <div className="auth-forgot">
      <div className="auth-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword} disabled={loading}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter the Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-danger" style={{
            color: 'red',
            fontSize: '14px'
          }}>{error}</p>}
          <div className="input-feild">
            <button
              type="submit"
              className="btn btn-success w-100 rounded-0"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
