import React, { useState } from 'react'
import './AddItem.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

function AddItem(props) {

  const { user, getItemDetails } = useAuth();

  const [itemType, setItemtype] = useState("Lost");

  const [itemDetail, setItemDetail] = useState({
    item: "",
    itemType: "Lost",
    imgURL: "",
    location: "",
    contName: "",
    contTel: "",
    username: ""
  }
  );

  function handleInput(event) {
    const { name, value } = event.target;
    setItemDetail(prevItemDetails => {
      return {
        ...prevItemDetails,
        [name]: value
      };
    }
    );

  }



  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);


  const handleFileUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {


      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "lost_and_found_item_img");
      data.append("cloud_name", "dajljmfsl");

      const res = await fetch("https://api.cloudinary.com/v1_1/dajljmfsl/image/upload", {
        method: "POST",
        body: data
      });
      const imgURL = await res.json();
      setUploading(false);


      setItemDetail(prev => ({
        ...prev,
        imgURL: imgURL.url,
        itemType: itemType,
        username: user.username
      }));
      console.log(itemDetail);


      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const handleDrag = (e) => {

    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploading(true);
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    setUploading(true);
    const imgFile = e.target.files
    if (imgFile && imgFile[0]) {

      handleFileUpload(imgFile[0]);
    }
  };

  const removeImage = () => {
    setItemDetail(prev => ({
      ...prev,
      imgURL: ""
    }));
    setImagePreview("");
  };



  const navigate = useNavigate();

  const submitItemDetails = async (event) => {
    // props.onAdd(itemDetail);
    // props.onClickClose();
    event.preventDefault();
    try {
      const response = await fetch("https://lost-found-app-api.vercel.app/api/form/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(itemDetail)
      });

      if (response.ok) {
        setItemDetail({
          item: "",
          itemType: "Lost",
          imgURL: "",
          location: "",
          contName: "",
          contTel: "",
          username: ""
        });
        getItemDetails();
        const data = await response.json();
        console.log("hgdhd", data);
        toast.success("Item Added");
        navigate("/");
      }

    } catch (error) {
      console.log(error);

    }
    setItemDetail({
      item: "",
      itemType: "Lost",
      imgURL: "",
      location: "",
      contName: "",
      contTel: "",
      username: ""
    })
  }

  function closeAddItemCard(event) {
    event.preventDefault();
    navigate("/");
  }


  return (
    <div className='abc'>
      <div className='add-item-page'>
        <div className="add-item-card">

          {/* header */}
          <div className="header">
            <h2>{itemType == "Lost" ? "Report Lost Item" : "Report Found Item"}</h2>
            <p>{itemType == "Lost" ? "Fill in the details to help others find your item" : "Help someone get their item back"}</p>
            <button className='close-button' onClick={closeAddItemCard}>✕</button>
          </div>

          {/* select item type */}
          <div className="item-type-sec">
            <label className="item-type-label">
              What are you reporting?
            </label>
            <div className="item-type-btns">
              <button className={`item-type-btn-${itemType == "Lost" ? "active" : "inactive"}`} onClick={() => setItemtype("Lost")}>Lost Item</button>
              <button className={`item-type-btn-${itemType == "Found" ? "active" : "inactive"}`} onClick={() => setItemtype("Found")}>Found Item</button>
            </div>
          </div>

          
          <form className='addItemForm' onSubmit={submitItemDetails}>

            {/* item name */}
            <label className='input-label'>Item Name <span>*</span></label>
            <input name='item' onChange={handleInput} value={itemDetail.item} placeholder='e.g., Keys, Laptop, Charger' required />


            {/* upload image */}
            <label className='input-label'>Upload Image</label>

            {imagePreview === "" ? (
              <div className={`upld-img-box-${dragActive}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}>
                <div className="cam-icon">📷</div>
                {uploading ? <p>Uploading...<br></br> ⎛⎝ ≽ &gt; ⩊ &lt; ≼ ⎠⎞</p> : <p>Drop an image of your {itemType} item here or click to browse</p>}
                <span>Supports: JPG, PNG, GIF</span>
                <input id='fileInput' name='imgURL'
                  type="file" accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange} required />
              </div>
            ) : (
              <div className='img-preview-box'>
                <img src={imagePreview} alt='Preview'></img>
                <button type='button' onClick={removeImage}>✕</button>
              </div>
            )}

            {/* location */}
            <label className='input-label'>Last Seen location <span>*</span></label>
            <textarea name='location' onChange={handleInput} value={itemDetail.location} placeholder={`Describe where you ${itemType} the item...`} />

            {/* your name */}
            <label className='input-label'>Your Name <span>*</span></label>
            <input name='contName' onChange={handleInput} value={itemDetail.contName} placeholder='Enter Your Full Name' required />

            {/* contact info */}
            <label className='input-label'>Contact Information <span>*</span></label>
            <input name='contTel' onChange={handleInput} value={itemDetail.contTel} placeholder='Phone number or email address' required />

            {/* submit form */}
            <button className='item-submit-button'>Submit {itemType} Item Report</button>

          </form>

        </div>
      </div>
    </div>
  )
}


export default AddItem;
