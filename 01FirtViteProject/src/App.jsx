import React from 'react'
import Simpleform from './Simpleform'
import Header from './header'
import Footer from './Footer'
import ColorChange from './ColorChange'
const clickevent = ()=>{
console.log("clickevent");
}
const onmouseover=()=>{
  console.log('onmouseover');
}
const onmouseout=()=>{
  console.log('onmouseout');
}
const onkeydown=()=>{
  console.log('onkeydown');
}
const onkeyup=()=>{
  console.log('onkeyup');
}
const myFunction=()=>{
  console.log('this is onLoad function');
}
const onchange=()=>{
  console.log('onchange');
}

const App = () => {
  return (
    <>
    {/* <h1 onLoad={myFunction}>All Events</h1>
     <button onClick={clickevent}>ClickMe</button>
     <p onMouseOver={onmouseover} onMouseOut={onmouseout}>onMouseoVer</p>
     <input type="text" onKeyDown={onkeydown} onKeyUp={onkeyup} />
     
     <br/><br/>
     <select onChange={onchange}>
      <option>A</option>
      <option>B</option>
     </select>
    <Header />
    <Simpleform />
    <Footer /> */}
    <ColorChange />
    </>
  )
}

export default App