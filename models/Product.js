import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    color: { type: mongoose.Types.ObjectId, ref: "Color" },
    size: { type: mongoose.Types.ObjectId, ref: "Size" },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    used: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
export const Product = models.Product || model("Product", ProductSchema);
