import { useState } from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleSubmit = async(e)=>{

e.preventDefault();

await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
);

alert("Login Successful");

};

return(
    <div>

<div className="login-container">

<h2 className="login-title">Login</h2>
<hr/>
<br></br><br></br>

<form className="login-form" onSubmit={handleSubmit}>

<input
className="input-login"
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="input-login"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<a className="link" href="http://localhost:5173/forgot-password">Forget Password?</a>

<button className="login-btn">Login</button>

<p>Not a Member? <a className="link" href="http://localhost:5173/register">Signup</a></p>

</form>

</div>
</div>  

);

}

export default Login;