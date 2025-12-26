import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

function Header(props) {

  // function handleClick(event) {
  //   props.onLogIn();
  //   event.preventDefault();
  // }

  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();


  return (
    <header>
      <div id="navbar">
        <p><a href='/' className=''>Lost and Found</a></p>
        {isLoggedIn ?
          <button onClick={() => navigate("/logout")}>
            <div><i className="fa-solid fa-circle-user"></i><span>{(user.username)?.trim().split(/\s+/)[0]}</span></div>
          </button> :
          <button onClick={() => navigate("/login")}>
            Log in
          </button>}
      </div>
    </header>
  );
}

export default Header;