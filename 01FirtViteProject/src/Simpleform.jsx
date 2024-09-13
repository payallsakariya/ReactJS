
 import React from 'react'

const Simpleform = () => {
  return (
    <>
    <div>Simpleform</div>
    <form>
  <div className="">
    <label>Email address</label>
    <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" className="">We'll never share your email with anyone else.</small>
  </div>
  <div className="">
    <label>Password</label>
    <input type="password" className="" id="exampleInputPassword1" />
  </div>
  <div className="">
    <input type="checkbox" id="exampleCheck1" />
    <label className="">Check me out</label>
  </div>
  <button type="submit" className="">Submit</button>
</form>
    </>
  )
}

export default Simpleform