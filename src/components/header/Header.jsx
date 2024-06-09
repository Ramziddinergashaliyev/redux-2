import React, { useEffect, useState } from "react";
let API_URL = "http://localhost:4000/products";
import "./header.scss";

function Header() {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      title,
      price,
      category,
      image,
    };
    console.log(user);
    setReload((prev) => !prev);
    setTitle("");
    setCategory("");
    setImage("");
    setPrice("");

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
        <h1 className="header__card__title">title: {el?.title}</h1>
        <p className="header__card__text">price: {el?.category}</p>
        <p className="header__card__text">price: {el?.price}</p>
      </div>
      <div className="header__card__btns">
        <button
          onClick={() => handleDelete(el.id)}
          className="header__card-delete"
        >
          delete
        </button>
        <button onClick={() => setEdit(el)} className="header__card-edit">
          edit
        </button>
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
      setReload((prev) => !prev);
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
    setReload((p) => !p);
    setEdit(null);
  };

  return (
    <section className="header container">
      <div className="header__form">
        <h1>Products</h1>
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
            type="number"
            placeholder="price"
          />
          <button>Submit</button>
        </form>
      </div>
      {edit ? (
        <form className="form__edit" onSubmit={handleEdit} action="">
          <input
            value={edit.image}
            onChange={(e) => setEdit((p) => ({ ...p, image: e.target.value }))}
            type="url"
          />
          <input
            value={edit.title}
            onChange={(e) => setEdit((p) => ({ ...p, title: e.target.value }))}
            type="text"
          />
          <input
            value={edit.category}
            onChange={(e) =>
              setEdit((p) => ({ ...p, category: e.target.value }))
            }
            type="text"
          />
          <input
            value={edit.price}
            onChange={(e) => setEdit((p) => ({ ...p, price: e.target.value }))}
            type="number"
          />
          <button className="edit__btn-save">Save</button>
          <button
            type="button"
            onClick={() => setEdit(null)}
            className="edit__btn-cancel"
          >
            Cancel
          </button>
        </form>
      ) : (
        <></>
      )}

      <div className="header__cards">{dataForm}</div>
    </section>
  );
}

export default Header;
