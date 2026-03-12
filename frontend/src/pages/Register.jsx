import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   await axios.post(
  //     "http://localhost:5000/api/auth/register",
  //     { name, email, password, confirmPassword }
  //   );

  //   alert("User Registered");
  // };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );

    alert("User Registered");
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <div className="">
            <label className="input-titleconfirm">
              <b>Confirm Password:</b>
              <br /></label>

            <input className="input-field"
              placeholder="Enter name"
              type="text"
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>

          <br />

          <button className="register-btn">Register</button>

          <p>Already have a account? <a href="http://localhost:5173/login"> Log In</a></p>

        </form>

      </div>
    </div>
  );
}

export default Register;