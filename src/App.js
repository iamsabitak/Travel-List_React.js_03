import "./index.css";

import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
  { id: 3, description: "Mobile", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items}/>
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
const Form = ({onAddItems}) => {
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);

    onAddItems(newItems);

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
const PackingList = ({items}) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
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
