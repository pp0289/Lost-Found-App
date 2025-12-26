import React from 'react';
import ReactDOM from 'react-dom/client';
import { useAuth } from '../store/auth';

function Card(props) {

  const { user } = useAuth();

  function handleClick() {
    props.onDelete(props.id)
  }

  return (
    <div className="lost-card">
      <div className="img-container">
        <img src={props.img} alt="lost-found-img" />
      </div>
      <div className="item-details">
        <div className={`item-type-${props.itemType}`}>{props.itemType == "Found" ? "FOUND" : "LOST"}</div>
        <p>{props.name}</p>
        <div className="item-location">
          {props.location}
        </div>
        <div className="contact-details">
          <div className="contact-name">
            <div style={{ fontWeight: '500', marginRight: '10px' }}>Contact:</div>
            <div>{props.contName}</div>
          </div>
          <div className="contact-no">
            <div style={{ fontWeight: '500', marginRight: '10px' }}>Phone:</div>
            <div>{props.contTel}</div>
          </div>
        </div>
        <button className='chat-btn' style={user.username === props.username ? {width: 'calc(100% - 5vw - 10px)'} : {}} onClick={() => alert("This feature will be released shortly")}><i class="fa-regular fa-comment" style={{ marginRight: '10px' }}></i>CHAT</button>

        {user.username === props.username ? <button className='delete-btn' onClick={handleClick}>DELETE</button> : null}

      </div>
    </div>
  );
}

export default Card;