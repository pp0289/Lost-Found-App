
// import './App.css';
import Header from './components/header';
import Card from './components/card';
import AddItemsButton from './components/AddItemsButton';
import item_details from './item_details';
import Footer from './components/footer';
import AddItems from './pages/AddItem';
import { useState } from 'react';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Error from './pages/Error';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Logout } from './pages/Logout';



function App() {

  return (
    <>

      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/additem" element={<AddItems />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>


    </>
  )












  //   const [details, setDetails] = useState([]);

  //   function addItemDetails(newDetail) {
  //     setDetails(prevDetails => {
  //       return [...prevDetails, newDetail]
  //     })
  //   }

  //   function deleteItem(id) {
  //     setDetails(prevDetail => {
  //       return prevDetail.filter((item, index) => {
  //         return index !== id
  //       })
  //     })
  //   }

  //   const [addItemClicked, setAddItemClicked] = useState(false);

  //   function addItemCard() {
  //     setAddItemClicked(!addItemClicked)
  //   }

  //   const [isLogIn, setIslogIn] = useState(false);

  //   function logedIn() {
  //     setIslogIn(!isLogIn);
  //     setClickedlogIn(false);
  //   }
  //   const [clickedLogIn, setClickedlogIn] = useState(false);

  //   function clickLogIn() {
  //     setClickedlogIn(!clickedLogIn);
  //     setAddItemClicked(false);
  //   }

  //   if (!addItemClicked && !clickedLogIn) {
  //     return (
  //       <div>
  //         {/* <h1>hii</h1> */}
  //         {isLogIn ?
  //           <Header
  //             name={<div><i class="fa-solid fa-circle-user"></i><span>User</span></div>}
  //             onLogIn={logedIn}
  //           /> :
  //           <Header
  //             name="Log in"
  //             onLogIn={clickLogIn}
  //           />}
  //         <AddItemsButton
  //           onClickAdd={addItemCard}
  //         />
  //         <main>
  //           {details.map((item, index) => {
  //             return <Card
  //               key={index}
  //               id={index}
  //               img={item.imgURL}
  //               name={item.item}
  //               location={item.location}
  //               contName={item.contName}
  //               contTel={item.contTel}
  //               onDelete={deleteItem}
  //             />
  //           })}

  //           {item_details.map(cardTerm => (
  //             <Card
  //               key={cardTerm.id}
  //               img={cardTerm.imgURL}
  //               name={cardTerm.name}
  //               location={cardTerm.location}
  //               contName={cardTerm.contName}
  //               contTel={cardTerm.contTel}
  //             />
  //           ))
  //           }
  //         </main>
  //         <Footer />
  //       </div>
  //     );
  //   }
  //   else if (clickedLogIn) {
  //     return (
  //       <Login
  //         onLogIn={logedIn}
  //         onClickClose={clickLogIn}
  //       />
  //     )
  //   }
  //   else {
  //     return (
  //       isLogIn ?
  //         <AddItems
  //           onAdd={addItemDetails}
  //           onClickClose={addItemCard}
  //         /> :
  //         <Login
  //           onLogIn={logedIn}
  //           onClickClose={clickLogIn}
  //         />
  //     );
  //   }


}

export default App;
