
 import React from 'react'

const Simpleform = () => {
  return (
    <>
    <div>Simpleform</div>
    <form>
  <div classname="">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <small id="emailHelp" classname="">We'll never share your email with anyone else.</small>
  </div>
  <div classname="">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" classname="" id="exampleInputPassword1" />
  </div>
  <div classname="">
    <input type="checkbox" id="exampleCheck1" />
    <label classname="" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" classname="">Submit</button>
</form>
    </>
  )
}

export default Simpleform