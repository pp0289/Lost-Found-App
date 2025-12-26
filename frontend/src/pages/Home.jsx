import Card from '../components/card';
import AddItemsButton from '../components/AddItemsButton';
import item_details from '../item_details';
import Footer from '../components/footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


function Home() {

  const { itemDetails, getItemDetails, authorizationToken } = useAuth();
  const navigate = useNavigate();

  const deleteItem = async (id) => {

    const response = await fetch(`https://lost-found-app-api.vercel.app/api/auth/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    if (response.ok){
      getItemDetails();
      toast.success("Item Deleted Successfully");
    }
    else {
      toast.error("Not Deleted");

    }
    // console.log("after del",id);

  }

  return (
    <>

      <AddItemsButton
      // onClickAdd={addItemCard}
      />
      <main>
        {/* {details.map((item, index) => {
          return <Card
            key={index}
            id={index}
            img={item.imgURL}
            name={item.item}
            location={item.location}
            contName={item.contName}
            contTel={item.contTel}
            onDelete={deleteItem}
          />
        })} */}

        {(itemDetails).map((cardTerm, index) => {
          return (<Card
            key={index}
            id={cardTerm._id}
            img={cardTerm.imgURL}
            name={cardTerm.item}
            itemType={cardTerm.itemType}
            location={cardTerm.location}
            contName={cardTerm.contName}
            contTel={cardTerm.contTel}
            username={cardTerm.username}
            onDelete={deleteItem}
          />);
        })
        }
      </main>
      <Footer />
    </>
  );
}

export default Home;