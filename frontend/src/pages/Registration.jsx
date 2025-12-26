import React, { useState } from 'react'
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL = "https://lost-found-app-api.vercel.app/api/auth/register";


function Registration() {

    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    function addItemUser(newUser) {
      setUser(prevUser => {
        return [...prevUser, newUser]
      });
    }

  const handleClick = async () => {
    navigate("/");
  }
  
    // handling the input values
    function handleInput(event) {
      let { name, value } = event.target

      setUser({
        ...user,
        [name]: value
      });
    }

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

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
        // console.log(user);
        // console.log("jshd",response);


        const res_data = await response.json();
        console.log("res from server", res_data);

        if (response.ok) {

          // stored the token in localhost
          storeTokenInLS(res_data.token);
          setUser({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
          toast.success("Registration Successful");
          navigate("/login");
        }
        else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }


      } catch (error) {
        console.log("register", error);

      }
    }


    return (
      <div className='registration-page'>
        <div className="registration-box">
          <img src="iitk_logo.png" alt="IITK logo" />
          <form onSubmit={handleSubmit}>
            <p>Username</p>
            <input name='username' value={user.username} onChange={handleInput} type="text" placeholder="Enter your username" required />
            <p>Email</p>
            <input name='email' value={user.email} onChange={handleInput} type="email" placeholder="Enter your email" required />
            <p>Password</p>
            <input name='password' value={user.password} onChange={handleInput} type="password" placeholder="Password" required />
            <p>Confirm Password</p>
            <input name='confirmPassword' value={user.confirmPassword} onChange={handleInput} type="password" placeholder="Confirm Password" required />
            <button className="submit" type="submit">Register
            </button>
             <span>Already have an account? </span>
            <a className="new-user" href='/login'>Login here.</a>
          </form>
          <button className='close-registration-button' onClick={handleClick} >X</button>
        </div>
      </div>
    );
  }


export default Registration;

