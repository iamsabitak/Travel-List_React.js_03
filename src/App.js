import "./index.css";

import React, { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
//   { id: 3, description: "Mobile", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onTogglleItems={handleToggleItems}
      />
      <Stats items={items} />
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
const Form = ({ onAddItems }) => {
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
const PackingList = ({ items, onDeleteItems, onTogglleItems }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onTogglleItems={onTogglleItems}
          />
        ))}
      </ul>
    </div>
  );
};
const Item = ({ item, onDeleteItems, onTogglleItems }) => {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onTogglleItems(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
      </li>
    </>
  );
};
const Stats = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

if(!items.length) return <p className="stats">
  <em>
   Start adding ome items in your packing list 🚀
  </em>
</p>

  return (
    <>
      <footer className="stats">
        <em>
          {
          percentage === 100 ? "You got everything! Ready to go 🛩️" :
         ` 💼 You have ${numItems} items in your list, and you have already packed
          ${numPacked} (${percentage}%)`
        }
        </em>
      </footer>
    </>
  );
};
