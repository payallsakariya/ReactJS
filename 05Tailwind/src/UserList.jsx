import React, { useEffect, useState } from 'react';

const UserList = () => {
  // State to store user data
  const [users, setUsers] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Define an async function to fetch data
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>Loading...</p> // Show a loading state while fetching
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li> // Display each user's name
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
