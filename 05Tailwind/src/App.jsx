import { useState } from 'react'
import './App.css'
import SignInForm from './SignInForm';
import { CardTwo } from "./CardTwo";
import FetchingData from './FetchingData';
import WindowResizeComponent from './WindowResizeComponent';
import FetchAPI from "./FetchAPI";
import PasswordGenerator from './PasswordGenerator';

function App() {
  let login ='false';
  return (
   <>
   {/* <FetchAPI url="https://hitvaniapp.excellcons.com/datalist"/> */}
   {/* <FetchingData url="https://hitvaniapp.excellcons.com/api/menucontent" /> */}
   {/* <WindowResizeComponent /> */}
      <PasswordGenerator />
      
   </>
  );
}

export default App
