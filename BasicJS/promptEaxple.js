const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter Your age: ", (age) => {
  age = Number(age); // Convert the input to a number

  if (age = 30) {
    console.log("Yes Eligible for Vote");
  } else {
    console.log("Not Eligible for Vote");
  }

  rl.close(); // Close the input stream
});