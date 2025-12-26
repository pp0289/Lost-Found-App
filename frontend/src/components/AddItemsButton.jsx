import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';


// const customStyle = {
//   margine-right: "10px"
// };

function AddItemsButton(props) {

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();


  function handleClick() {
    {
      isLoggedIn ?
        navigate("/additem") :
        navigate("/login")
    }
  }

  return (
    <button className="add-items" onClick={handleClick}><i className="fa-solid fa-plus" style={{ marginRight: '10px' }}></i>Add Items</button>
  );
}

export default AddItemsButton;