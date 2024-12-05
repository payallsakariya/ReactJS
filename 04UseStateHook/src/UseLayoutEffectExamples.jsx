import React, { useEffect, useLayoutEffect, useState } from 'react'

const UseLayoutEffectExamples = () => {
  let [count,setCount] = useState(0);
  let [preCount,setPreCount] = useState(0);
  useEffect(()=>{
    setPreCount(pre => pre + 2);
    console.log("Count is called with useEffect...");
  },[count])
  useLayoutEffect(()=>{
    console.log("Count is called with useLayoutEffect...");
  },[preCount])
  return (
    <>
      <h1>Count is = {count} and {preCount}</h1>
      <button onClick={()=>{setCount(pre => pre + 1);}}>INC</button>
    </>
  )
}

export default UseLayoutEffectExamples