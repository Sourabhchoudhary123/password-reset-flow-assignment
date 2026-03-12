import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/auth/forgot-password",
      { email }
    );

    alert("Reset link sent to email");
  };

  return (
    <div className="main-containerfgt">
      <div className="container-fgt">
        <h2 className="fgt-title">Forgot Password?</h2>


        <p>Remember your password?  <a href="http://localhost:5173/Login">Login here</a></p>

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