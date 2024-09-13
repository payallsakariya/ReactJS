import React from 'react'
import { useState } from "react";

function ChangeColor() {
    let [value, setValue] = useState(10);
    let [color, setColor] = useState("white");
    const add = () => {
        setValue((value += 1));
        console.log(value);
    };
  return (
    <div className="container" style={{ backgroundColor: color }}>
    <div className="card">
        {value}&nbsp;&nbsp;&nbsp;
        <button onClick={add}>add</button>&nbsp;&nbsp;&nbsp;
        <button onClick={()=>setColor("red")}>Red</button>&nbsp;&nbsp;&nbsp;
        <button onClick={()=>setColor("blue")}>Blue</button>&nbsp;&nbsp;&nbsp;
        <button onClick={()=>setColor("green")}>Green</button>&nbsp;&nbsp;&nbsp;
        <button onClick={()=>setColor("yellow")}>Yellow</button>&nbsp;&nbsp;&nbsp;
        <button onClick={()=>setColor("pink")}>Pink</button>
    </div>
</div>
  )
}

export default ChangeColor