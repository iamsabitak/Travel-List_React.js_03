import "./index.css";

import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
  { id: 3, description: "Mobile", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return (
    <div className="logo">
      <h1> 🏖️ Far Away 🧳 </h1>
    </div>
  );
};
const Form = () => {
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);

    setDescription("");
    setQuantity(1);
  };
  return (
    <>
      <form className="add-form" onSubmit={onHandleSubmit}>
        <h3>What do you need for your 🥰 trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Items...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
};
const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};
const Item = ({ item }) => {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button>❌</button>
      </li>
    </>
  );
};
const Stats = () => {
  return (
    <>
      <footer className="stats">
        <em>
          💼 You have X items in your list, and you have already packed X (X%)
        </em>
      </footer>
    </>
  );
};
