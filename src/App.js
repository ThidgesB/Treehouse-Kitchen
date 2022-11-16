import React, { useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/RegisterPage/Register';


function App() {


  return (
    <div className='appContainer'>
      <div>
      <NavBar />
      <Register />
      </div>
    </div>
  );
}

export default App;
