export interface InventoryItem {
  _id?: string;
  name: string;
  description: string;
  quantity: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}
