import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signin_signup.scss";
import axios from 'axios';

interface User {
    email: string;
    password: string;
    username?: string;
}

const SigninSignup: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [labelText, setLabelText] = useState<string>('To keep connected with us please login with your personal info');
    const [headerText, setHeaderText] = useState<string>('Welcome Back!');
    const [buttonText, setButtonText] = useState<string>('SIGN UP');
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        username: "",
    });

    const navigate = useNavigate();

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
        if (isSignUp) {
            setLabelText('To keep connected with us please login with your personal info');
            setHeaderText('Welcome Back!');
            setButtonText('SIGN UP');
        } else {
            setLabelText('Enter your personal details and start your journey with us');
            setHeaderText('Hello, Friend!');
            setButtonText('SIGN IN');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const login = () => {
        if (!user.email || !user.password) {
            alert("Email and password cannot be empty");
            return;
        }

        axios.post("http://localhost:8080/api/v1/login", user)
            .then(response => {
                console.log("Success Login", response.data);
                console.log("Success Login_2", response.data.role);

                if (response.data.token) {
                    alert("Login successful!");
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.role);

                    if (response.data.role === 1) {
                        navigate('/admin');
                    } else {
                        navigate('/user');
                    }
                } else {
                    alert(response.data.message || "Login failed!");
                }
            })
            .catch(error => {
                console.error("Error Login", error.response?.data?.message);
                alert(error.response?.data?.message || "Login failed!");
            });
    };

    const register = () => {
        axios.post("http://localhost:8080/api/v1/register", user)
            .then(response => {
                console.log("Success Register", response.data);
                alert("Registration successful!");
            })
            .catch(error => {
                console.error("Error Register", error.response?.data?.message);
                alert(error.response?.data?.message || "Registration failed!");
            });
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            <div className="form-container sign-up-container">
                <h1>Create Account</h1>
                <div className="social-container">
                    <button className='sign-in-container-button-icon'><i className="fab fa-facebook"></i></button>
                    <button className='sign-in-container-button-icon'><i className="fab fa-google"></i></button>
                    <button className='sign-in-container-button-icon'><i className="fab fa-instagram"></i></button>
                </div>
                <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleInputChange} /><br />
                <input type="text" placeholder="Email" name="email" value={user.email} onChange={handleInputChange} /><br />
                <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleInputChange} /><br />
                <input type="password" placeholder="Confirm Password" /><br />
                <button onClick={register}>SIGN UP</button>
            </div>
            <div className="form-container sign-in-container">
                <h1>Sign in</h1>
                <div className="social-container">
                    <button className='sign-in-container-button-icon'><i className="fab fa-facebook"></i></button>
                    <button className='sign-in-container-button-icon'><i className="fab fa-google"></i></button>
                    <button className='sign-in-container-button-icon'><i className="fab fa-instagram"></i></button>
                </div>
                <input type="text" placeholder="Email" name="email" value={user.email} onChange={handleInputChange} /><br />
                <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleInputChange} /><br />
                <a href="#">Forgot your password?</a>
                <button onClick={login}>SIGN IN</button>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>{headerText}</h1>
                        <label className="label">{labelText}</label> <br />
                        <button className="button" onClick={handleToggle}>{buttonText}</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
                        <label>{isSignUp ? 'To keep connected with us please login with your personal info' : 'Enter your personal details and start your journey with us'}</label><br />
                        <button className="button" onClick={handleToggle}>{isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SigninSignup;
