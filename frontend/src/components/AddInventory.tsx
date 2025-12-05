import React, { useState } from "react";
import api from "../api";
import { InventoryItem } from "../types";

interface AddInventoryProps {
  onAdded: () => void;
}

const AddInventory: React.FC<AddInventoryProps> = ({ onAdded }) => {
  const [form, setForm] = useState<InventoryItem>({
    name: "",
    description: "",
    quantity: 0,
    status: "in-stock"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/inventory", form);
      alert("Item added!");
      onAdded();
      setForm({ name: "", description: "", quantity: 0, status: "in-stock" });
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Styling constants
  const styles = {
    form: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      margin: "20px auto",
      fontFamily: "Roboto, sans-serif"
    },
    heading: {
      color: "#0d47a1",
      marginBottom: "16px",
      textAlign: "center"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontFamily: "Roboto, sans-serif"
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontFamily: "Roboto, sans-serif"
    },
    button: {
      width: "100%",
      backgroundColor: "#1976d2",
      color: "#fff",
      border: "none",
      padding: "12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s ease"
    },
    buttonDisabled: {
      backgroundColor: "#90caf9",
      cursor: "not-allowed"
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add Inventory Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        style={styles.input}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {})
        }}
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "20px auto",
    fontFamily: "Roboto, sans-serif"
  },
  heading: {
    color: "#0d47a1",
    marginBottom: "16px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontFamily: "Roboto, sans-serif"
  },
  button: {
    width: "100%",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500
  }
};




export default AddInventory;
