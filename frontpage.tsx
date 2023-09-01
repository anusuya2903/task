import React, { useEffect } from 'react';
import login from './img/login.png'
import register from './img/register.png'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInSignUp: React.FC = () => {

    var Navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailSignIn, setEmailSignIn] = useState<string>('');
    const [passwordSignIn, setPasswordSignIn] = useState<string>('');

    const signUpInfo = {
        username: username,
        email: email,
        password: password,
    }

    const handleSignUp = async () => {
        // e.preventDefault();
        if (username && email && password) {
            if (email) {
                const postRequest = await axios.post("http://localhost:8000/signup", signUpInfo)
                if (postRequest.data.message === "userCreated") {
                    alert("You have successfully Signed Up!");
                    // Navigate('/signin')
                }
                if (postRequest.data.message === "User already exist") {
                    alert("User already exist");
                    // Navigate('/signin')
                }
                if (postRequest.data.message === "All fields are required!") {
                    alert("All fields are required!");
                    // Navigate('/signup')
                }
            } else {
                alert("Sorry!")
            }
        } else {
            alert("All fields are required!")
        }
    };

    const signInInfo = {
        email: emailSignIn,
        password: passwordSignIn,
    };

    const handleSignIn = async () => {
        if (emailSignIn && passwordSignIn) {
            try {
                console.log(signInInfo)
                const response = await axios.post("http://localhost:8000/backend", signInInfo);
                const responseData = response.data; // Get the response data directly
                console.log(responseData.message);

                if (response.data.message === "Sign-in successful") {
                    console.log("RES");

                    alert("You have successfully logged in!");
                    // Cookies.set("userInfo", email);
                    Navigate("/home");
                }
                if (responseData.message === "Invalid credentials") {
                    alert("Invalid credentials");
                }
                if (responseData.message === "User not found") {
                    alert("User not found");
                }
                if (responseData.message === "All fields are required") {
                    alert("All fields are required");
                }
            } catch (error) {
                console.error("Error signing in:", error);
            }
        } else {
            alert("All fields are required!");
        }

    };



    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        if (sign_up_btn && sign_in_btn && container) {
            sign_up_btn.addEventListener("click", () => {
                container.classList.add("sign-up-mode");
            });

            sign_in_btn.addEventListener("click", () => {
                container.classList.remove("sign-up-mode");
            });
        }
    }, []); // Empty dependency array means the effect runs once after the initial render


    return (
        <div>
            {/* whole container that contains the screen content */}
            <div className="container">
                {/* z-index top = login form and signup navigation */}

                <div className="forms-container">
                    <div className="signin-signup">
                        {/* signin form */}
                        <form className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="email" placeholder="Email" onChange={(e) => setEmailSignIn(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="password" placeholder="Password" onChange={(e) => setPasswordSignIn(e.target.value)} />
                            </div>
                            <input type="button" value="Login" className="btn solid" onClick={handleSignIn} />
                        </form>
                        {/* signup form */}
                        <form className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <input type="button" className="btn" value="Sign up" onClick={handleSignUp} />
                        </form>
                    </div>
                </div>

                {/* z index behind the signup form and login navigation */}
                <div className="panels-container">
                    {/* signup form */}
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New User ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.consectetur
                                vitae neque dicta accusamus minus sint.
                            </p>
                            <button className="btn-transparent" id="sign-up-btn"  >
                                Sign up
                            </button>
                        </div>
                        <img src={login} className="image" alt="login" />
                    </div>
                    {/* login form navigation */}
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Welcome Back!</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn-transparent" id="sign-in-btn" >
                                Log in
                            </button>
                        </div>
                        <img src={register} className="image" alt="register" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
