// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Page Not Found - Lost and Found</title>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
//   <style>

//   </style>
// </head>
// <body>
//   <script>
//     // Simple hover effect for the button
//     const btn = document.querySelector('.btn');

//     btn.addEventListener('mouseenter', function() {
//       this.style.transform = 'translateY(-2px) scale(1.02)';
//     });

//     btn.addEventListener('mouseleave', function() {
//       this.style.transform = 'translateY(0) scale(1)';
//     });

//     // Animate error code on page load
//     window.addEventListener('load', function() {
//       const errorCode = document.querySelector('.error-code');
//       errorCode.style.animation = 'glow 3s ease-in-out infinite alternate, fadeInUp 1s ease-out';
//     });
//   </script>
// </body>
// </html>

import React, { useState } from 'react'
import './Error.css'

function Error() {
  return (
    <div className="body">
      {/* <!-- Background pattern --> */}
      <div className="bg-pattern"></div>

      {/* <!-- Floating particles --> */}
      <div className="particle" style={{ top: '10%', left: '10%', width: '4px', height: '4px', animationDelay: '0s' }}></div>
      <div className="particle" style={{ top: '20%', left: '80%', width: '6px', height: '6px', animationDelay: '2s' }}></div>
      <div className="particle" style={{ top: '60%', left: '20%', width: '3px', height: '3px', animationDelay: '4s' }}></div>
      <div className="particle" style={{ top: '80%', left: '90%', width: '5px', height: '5px', animationDelay: '6s' }}></div>
      <div className="particle" style={{ top: '40%', left: '70%', width: '4px', height: '4px', animationDelay: '8s' }}></div>
      <div className="particle" style={{ top: '30%', left: '5%;', width: '3px', height: '3px', animationDelay: '1s' }}></div>
      <div className="particle" style={{ top: '70%', left: '85%', width: '4px', height: '4px', animationDelay: '3s' }}></div>
      <div className="particle" style={{ top: '15%', left: '60%', width: '5px', height: '5px', animationDelay: '5s' }}></div>

      <div className="container">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <h2 className="error-subtitle">Looks like this page got lost too!</h2>
        <p className="error-message">
          Don't worry, even the best explorers sometimes lose their way.
          Let's help you find what you're looking for in our Lost and Found collection.
        </p>

        <div className="action-buttons">
          <a href="/" className="btn btn-primary">
            <i className="fas fa-home"></i>
            Back to Home
          </a>
        </div>


      </div>
    </div>
  );
}

export default Error;