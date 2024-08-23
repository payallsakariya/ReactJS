fetch("products.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return console.log(data);
  });