import React, { useState } from "react";
import InventoryList from "./components/InventoryList";
import AddInventory from "./components/AddInventory";
import EditInventory from "./components/EditInventory";
import { InventoryItem } from "./types";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const handleAdded = () => setRefreshKey((oldKey) => oldKey + 1);
  const handleUpdated = () => {
    setEditingItem(null);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <AddInventory onAdded={handleAdded} />
      {editingItem && <EditInventory item={editingItem} onUpdated={handleUpdated} />}
      <InventoryList refreshKey={refreshKey} onEdit={setEditingItem} />
    </div>
  );
};

export default App;
