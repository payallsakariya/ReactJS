import  { useState }  from 'react'

function UseReducerEx() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Hardcoded example for username and password
      const validUsername = 'user';
      const validPassword = 'password';
  
      if (username === validUsername && password === validPassword) {
        setLoggedIn(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid username or password');
      }
    };


  
    const handleLogout = () => {
      setLoggedIn(false);
      setUsername('');
      setPassword('');
    };
  
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        {loggedIn ? (
          <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        )}
      </div>
    );
  }

export default UseReducerEx