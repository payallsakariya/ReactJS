import React from 'react'
import { useState } from "react";

const ColorChange = () =>  {
    
        let [value,setValue] = useState("white");
   
  return (
    <div className="container" style={{ backgroundColor: value }}>
    <div>
        <h1>ColorChange</h1>
        <button onClick={()=>setValue("red")} >Read</button><br />
        <button onClick={()=>setValue("blue")}>Blue</button>
    </div>
    </div>
  )
}

export default ColorChange