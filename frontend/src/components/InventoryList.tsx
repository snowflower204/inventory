import React, { useEffect, useState } from "react";
import api from "../api";
import { InventoryItem } from "../types";

interface InventoryListProps {
  refreshKey: number;
  onEdit: (item: InventoryItem) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ refreshKey, onEdit }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get<{ success: boolean; data: InventoryItem[] }>("/inventory");
        setItems(res.data.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      }
    };
    fetchItems();
  }, [refreshKey]);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await api.delete(`/inventory/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.description}  
            (Qty: {item.quantity}, Status: {item.status})
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
