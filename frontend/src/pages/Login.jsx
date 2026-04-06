import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //use the environment variable for the backend URL
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                { email:email.trim(),
                 password:password.trim() 
                }
            );

            // Store the token(if your backend send one)
            localStorage.setItem("token", response.data.token);
            alert("Login Successfull!");
            navigate("/");
        } catch (error) {
            console.error("Login error", error);
            alert(error.response?.data?.message || "Invalid Credentials");
        }
    };
    return (
        <div>

            <div className="login-container">

                <h2 className="login-title">Login</h2>
                <hr />
                <br></br><br></br>

                <form className="login-form" onSubmit={handleSubmit}>

                    <input
                        className="input-login"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="login-btn" type="submit">Login</button>

                    <p>Not a Member? <Link to="/register">Register here</Link></p>
                    <p><Link to="/forgot-password">Forgot Password</Link></p>

                </form>

            </div>
        </div>

    );
}

export default Login;