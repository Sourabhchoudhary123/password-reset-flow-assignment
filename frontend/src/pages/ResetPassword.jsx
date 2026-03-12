import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword(){

const {token} = useParams();

const [password,setPassword] = useState("");

const handleSubmit = async(e)=>{

e.preventDefault();

await axios.post(
`http://localhost:5000/api/auth/reset-password/${token}`,
{password}
);

alert("Password Updated");

};

return(

<div className="container-reset">

<h2 className="reset-title">Reset Password</h2>

{/* <hr/> */}

<form onSubmit={handleSubmit}>
<div className="reset-text">


<input
className="input-reset"
type="password"
placeholder="New Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn-reset1">Reset Password</button>
</div>

</form>

</div>

);

}

export default ResetPassword;