

// API endpoint for creating a new user
const apiUrl = 'products.json';



// Make a POST request using the Fetch API
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(newUserData => {
    // Process the newly created user data
    console.log('New User Data:', newUserData);
  })
  
  .catch(error => {
    console.error('Error:', error);
  });