import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      alert("Reset link sent to email");
    } catch (error) {
      console.log("Error sending reset link", error);
      alert("Something went wrong.Please try again");
    }


  };

  return (
    <div className="main-containerfgt">
      <div className="container-fgt">
        <h2 className="fgt-title">Forgot Password?</h2>


        <p>Remember your password?<Link to="/login">Login here</Link></p>

        <form onSubmit={handleSubmit}>
          <div className="cont">

            <div className="cont-main">
              <label className="email-fgt"><b>Email:</b></label> <input
                required
                className="input-fgt"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="btn-reset" type="submit">
                Send Reset Link
              </button>

            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;