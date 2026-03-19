import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [names, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const calling = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { names, email, password,confirmPassword }
      );

      alert("User Registered");
      navigate("/")
    } catch (error) {
      alert(error.calling?.data?.message || "Something went wrong");
    }
  };



  return (
    <div>
      <div className="container">

        <h2 className="title">Register</h2>

        <p className="login-p">Kindly fill in the form to register.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <label className="input-title">
              <b>Name:</b>
              <br /></label>

            <input className="input-field"
              placeholder="Enter name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              title="enter name"
            />
          </div>
          <br />

          <div className="input-cont">
            <label className="input-title"><b>Email:</b></label>
            <br />

            <input
              required
              className="input-field"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              title="enter email"
            />
          </div>
          <br />

          <div className="input-cont">
            <label className="input-title">
              <b>Password:</b>
            </label>
            <br />

            <input
              className="input-field"
              type="password"
              placeholder="Enter password"
              required
              title="enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <div className="">
            <label className="input-titleconfirm">
              <b>Confirm Password:</b>
              <br /></label>

            <input className="input-field"
              placeholder="Enter confirm password"
              type="password"
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
              title="enter confirm passowrd"
            />
          </div>

          <br />

          <button className="register-btn">Register</button>

          <p>Already have a account? <Link to="/login">Log In</Link></p>

        </form>

      </div>
    </div>
  );
}

export default Register;