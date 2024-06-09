import React, { useEffect, useState } from "react";
let API_URL = "http://localhost:4000/products";
import "./header.scss";

function Header() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  });

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      title,
      price,
      category,
      image,
    };
    console.log(user);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => console.log(res));
  };

  return (
    <div className="header">
      <form onSubmit={handleSubmit} action="">
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="title"
          placeholder="url"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="category"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="price"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Header;
