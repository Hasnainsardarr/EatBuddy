import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2'

import { AuthContext } from '../contexts/AuthProvider';

const Cards = ({ item }) => {
  const { name, image, price, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = item => {
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

      fetch('http://localhost:6001/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please login to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;


















































































//   return (
//     <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
//       <div
//         className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
//           isHeartFilled ? "text-rose-500" : "text-white"
//         }`}
//         onClick={handleHeartClick}
//       >
//         <FaHeart className="w-5 h-5 cursor-pointer" />
//       </div>
//       <Link to={`/menu/${item._id}`}>
//         <figure>
//           <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
//         </figure>
//       </Link>
//       <div className="card-body">
//         <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
//         <p>Description of the item</p>
//         <div className="card-actions justify-between items-center mt-2">
//           <h5 className="font-semibold">
//             <span className="text-sm text-red">$ </span> {item.price}
//           </h5>
//           <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );


// export default Cards;







































// // import React, { useContext, useState } from "react";
// // import { FaHeart } from "react-icons/fa";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../contexts/AuthProvider";
// // import Swal from 'sweetalert2';

// // const Cards = ({ item }) => {
// //   const { name, image, price, _id } = item;
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [isHeartFilled, setIsHeartFilled] = useState(false);

// //   const handleHeartClick = () => {
// //     setIsHeartFilled(!isHeartFilled);
// //   };

// //   // // Add to cart handler using fetch
// //   const handleAddToCart = (item) => {
// //     if (user && user.email) {
// //       const cartItem = {
// //         menuItemId: _id,
// //         name,
// //         quantity: 1,
// //         image,
// //         price,
// //         email: user.email
// //       }
// //       console.log("hello hi");
      

// //   //     fetch('http://localhost:6001/carts', {
// //   //       method: 'POST',
// //   //       headers: {
// //   //         'Content-Type': 'application/json'
// //   //       },
// //   //       body: JSON.stringify(cartItem)
// //   //     })
// //   //     .then(response => response.json())
// //   //     .then(data => {
// //   //       console.log(data);
// //   //       // Swal.fire({
// //   //       //   position: 'center',
// //   //       //   icon: 'success',
// //   //       //   title: 'Food added to the cart.',
// //   //       //   showConfirmButton: false,
// //   //       //   timer: 1500
// //   //       // });
// //   //     })
// //   // //     .catch(error => {
// //   // //       console.error("Error:", error);
// //   // //       Swal.fire({
// //   // //         position: 'center',
// //   // //         icon: 'error',
// //   // //         title: 'Failed to add to cart!',
// //   // //         text: error.message,
// //   // //         showConfirmButton: true
// //   // //       });
// //   // //     });

// //   // //   } else {
// //   // //     Swal.fire({
// //   // //       title: 'Please login to order the food',
// //   // //       icon: 'warning',
// //   // //       showCancelButton: true,
// //   // //       confirmButtonColor: '#3085d6',
// //   // //       cancelButtonColor: '#d33',
// //   // //       confirmButtonText: 'Login now!'
// //   // //     }).then((result) => {
// //   // //       if (result.isConfirmed) {
// //   // //         navigate('/login', { state: { from: location } });
// //   // //       }
// //   // //     });
// //   // //   }
// //   // // };
// //   const handleAddToCart = (item) => {
// //     console.log("Add to cart clicked", item);}


// //   return (
// //     <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
// //       <div
// //         className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
// //           isHeartFilled ? "text-rose-500" : "text-white"
// //         }`}
// //         onClick={handleHeartClick}
// //       >
// //         <FaHeart className="w-5 h-5 cursor-pointer" />
// //       </div>
// //       <Link to={`/menu/${item._id}`}>
// //         <figure>
// //           <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
// //         </figure>
// //       </Link>
// //       <div className="card-body">
// //         <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
// //         <p>Description of the item</p>
// //         <div className="card-actions justify-between items-center mt-2">
// //           <h5 className="font-semibold">
// //             <span className="text-sm text-red">$ </span> {item.price}
// //           </h5>
// //           <button  onClick={() => handleAddToCart(item)} className="btn bg-green text-white">Add to Cart</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
  

// // export default Cards;
  


