import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../http-common';
import './Styles/Register.css';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (email === '' || password === '' || username === '') {
            setError('Required fields are missing');
            setLoading(false);
        } else {
            const postData = {
                username: username,
                email: email,
                password: password,
            };

            try {
                const res = await apiClient.post('/auth/register', postData, {
                    headers: {
                        'x-access-token': 'token-value',
                    },
                });

                const user = {
                    status: `${res.status}-${res.statusText}`,
                    headers: res.headers,
                    data: res.data,
                };
                console.log(user);
            } catch (err) {
                console.error(err);
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/'); // Redirect to login after successful registration
            }, 1000);
        }
    };

    return (

        <div className="auth">
            <div className="auth-container">
                <form>
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} placeholder="Enter your email" onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-feild">
                        <button onClick={handleRegister}
                            disabled={loading} >
                            {loading ? 'Registering...' : 'Register'}
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
                        Already have an account? Login
                    </p>
                </form>
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
};

export default Register;
