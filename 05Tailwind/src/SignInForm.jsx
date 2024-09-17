import React, { useState } from 'react';


function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [flag,setFlag] = useState(true);
  const [cflag,setCflag] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('user name :-'+username);
    console.log('password :-'+password);
    // Simple validation logic
    if (username === 'payal@gmil.com' && password === '123456') {
      setFlag(false);
      setCflag(true);
    } else {
      setMessage('Invalid credentials');
    }

  };

function GetLOginData({user=password,pass=password}) {
    console.log(user);
    console.log(pass);
  }
  return (
    <div className="container flex justify-center items-center min-h-screen">
     {flag && (<div className="card border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <div className="w-full max-w-[950px] lg:mt-4 m-1">
          <div className="mb-7">
            <h1 className="text-4xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
              Sign in
            </h1>
          </div>
          <form className="space-y-5 dark:text-white" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="username" className="text-left">
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Email"
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <button type="submit" className="w-24 p-2 bg-blue-500 text-white rounded">
                Sign in
              </button>
            </div>
          </form>
          {message && (
            <p className={`mt-4 text-center text-sm font-medium ${message === 'Login successful!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>)} 
      {cflag && (
        <div className="card border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <div className="w-full max-w-[100000px] lg:mt-4 m-1">
        <h3 className='p-5 m-5'>Hello ,  <b>{username}</b></h3>
        <h3 className='p-5 m-5'>Your pass is <b>{password}</b></h3>
      </div>
      </div>)}
    </div>
  );
}

export default SignInForm;
