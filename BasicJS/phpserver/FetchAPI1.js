fetch("api.php?api_key=test2")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("hello");
    return console.log(data);
  });