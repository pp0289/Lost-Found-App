import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL = "https://lost-found-app-api.vercel.app/api/auth/login";


function Login(props) {

  // function handleSubmit(event) {
  //   props.onLogIn();
  //   event.preventDefault();
  // }

  // function closeLogin(event) {
  //   props.onClickClose();
  //   event.preventDefault();
  // }

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    let { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    })
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleClick = async () => {
    navigate("/");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      console.log(response);

      const res_data = await response.json();
      console.log("jhc", res_data);


      if (response.ok) {
        toast.success("Login Successful")
        // stored the token in localhost
        storeTokenInLS(res_data.token);
        setUser({
          email: "",
          password: ""
        });

        navigate("/");
      }
      else {
        console.log("INvalid credentials");
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);

      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="login-page" onSubmit={handleSubmit}>
      <div className="login-box">
        <img src="iitk_logo.png" alt="IITK logo" />
        <form>
          <p>Email</p>
          <input type="email" name='email' value={user.email} onChange={handleInput} required placeholder="Enter your username" />
          <p>Password</p>
          <input type="password" name='password' value={user.password} onChange={handleInput} required placeholder="Enter your password" />
          <button className="submit" type="submit">Login</button>
          <span>Don't have an account? </span>
          <a className="new-user" href="register">Sign Up</a>
        </form>
        <button className='close-login-button' onClick={handleClick}>X</button>
      </div>
    </div>
  );
}

export default Login;