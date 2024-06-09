import React, { useEffect, useState } from "react";
let API_URL = "http://localhost:4000/products";
import "./header.scss";

function Header() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  });

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

  const dataForm = data?.map((el) => (
    <div key={el.id} className="header__card">
      <div className="header__card__img">
        <img src={el?.image} alt="" />
      </div>
      <div className="header__card__info">
        <h1 className="header__card__title">{el?.title}</h1>
        <p className="header__card__text">{el?.price}</p>
      </div>
      <div className="header__card__btns">
        <button
          onClick={() => handleDelete(el.id)}
          className="header__card-delete"
        >
          delete
        </button>
        <button className="header__card-edit">edit</button>
      </div>
    </div>
  ));

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <section className="header container">
      <div className="header__form">
        <form onSubmit={handleSubmit} action="">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="url"
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

      <div className="header__cards">{dataForm}</div>
    </section>
  );
}

export default Header;
