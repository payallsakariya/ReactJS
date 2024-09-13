import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
const A ='29-08-2024';
const name= <h1 style={{ backgroundColor: "lightblue" }}>This is myFirst react project</h1>
const str2 = React.createElement(
  "h5",
  { style: { backgroundColor: "blue" } },
  "Hello"
);

createRoot(document.getElementById('root')).render(
  <>


    <App />

  </>
)

