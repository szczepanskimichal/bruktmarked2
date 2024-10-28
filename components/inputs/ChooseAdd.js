import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// TUTAJ JEST POTWIERDZANIE

export default function ChooseAdd({
  item,
  items,
  setItem,
  newItem,
  setNewItem,
  fetchItems,
  itemName,
  api,
}) {
  const [value, setValue] = useState("");

  async function addItem(e) {
    e.preventDefault();
    try {
      if (newItem !== "") {
        const response = await axios.post(`/api/${api}`, {
          name: newItem,
          value,
        });
        toast.success(`${itemName} added successfully!`);
        fetchItems();
      }
    } catch (error) {
      console.error(`Error adding ${itemName}:`, error);
    }
  }
  // po napisaniu async function addItem(e) napisze Api categories, colors, sizes.js !!!

  return (
    <div className="flex gap-1 items-center">
      <div className="flex-1">
        <label>Choose {itemName}</label>
        <select value={item || ""} onChange={(e) => setItem(e.target.value)}>
          <option value="">No {itemName}</option>
          {items.length > 0 &&
            items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex-1">
        <label>Or add a new one</label>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          {itemName === "color" && (
            <input
              type="text"
              placeholder="Hex value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
          <button
            type="button"
            onClick={addItem}
            className="border-2 border-color-800 bg-color-50 text-green-500 mb-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
