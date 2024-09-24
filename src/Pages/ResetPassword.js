import React, { useState } from 'react';
import './Styles/ResetPassword.css';
import apiClient from '../http-common';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Reset() {
    const [password, setPassword] = useState(''); // Add state for password
    const [confirmPassword, setConfirmPassword] = useState(''); // Add state for confirm password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [state] = useSearchParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password === '') {
            setError('Password is required');
            setLoading(false);
        } else if (password !== confirmPassword) {
            setError('Passwords does not match');
            setLoading(false);
        } else {
            const postData = {
                password: password, // Include the password in the POST data
            };

            try {
                const res = await apiClient.post(`auth/reset-password?id=${state.get("id")}&token=${state.get("token")}`, postData, {
                    headers: {
                        "x-access-token": "token-value",
                    },
                });

                const user = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                };
                console.log(user);
            } catch (err) {
                console.log(error);
            }

            setTimeout(() => {
                setLoading(false);
                alert('Password reset successfully!');
                navigate('/', { replace: true });
            }, 1000);
        }
    };

    return (
        <div className="auth-reset">
            <div className="auth-container">
                <h2>Reset Your Password</h2>
                <form>
                    <div className="form-group">

                        <label htmlFor="email">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter password'
                        />


                        <label htmlFor="email">Confirm Password</label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder='Enter confirm password'
                        />
                    </div>
                    <div className="input-feild">
                        <button onClick={handleResetPassword} disabled={loading} style={{ marginTop: '10px' }}>
                            {loading ? 'Sending Reset Email...' : 'Reset Password'}
                        </button>
                    </div>
                    <p
                        onClick={() => navigate('/login')}
                        style={{
                            marginTop: '10px',
                            textAlign: 'center',
                            color: '#0095ff',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '20px'
                        }}
                    >
                        Back to Login
                    </p>

                </form>
            </div>

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

    );
}

export default Reset;
