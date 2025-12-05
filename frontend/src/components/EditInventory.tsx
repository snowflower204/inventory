import React, { useState } from "react";
import api from "../api";
import { InventoryItem } from "../types";

interface EditInventoryProps {
  item: InventoryItem | null;
  onUpdated: () => void;
}

const EditInventory: React.FC<EditInventoryProps> = ({ item, onUpdated }) => {
  const [form, setForm] = useState<InventoryItem | null>(item);

  if (!form) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form!, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/inventory/${form?._id}`, form);
      alert("Item updated!");
      onUpdated();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Inventory Item</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditInventory;
