import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      required: true,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", InventorySchema);
