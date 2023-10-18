import React from "react";

export default function Item ({ item, onDeleteItems, onTogglleItems }){
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
