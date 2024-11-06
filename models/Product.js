import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    // images: [{ type: String }], // do wyswietlania zdjec na karcie produktu, brakowalo mi tego a glowilem sie dlaczego nie wyswietlalo mi zdjec
    images: [{ type: String }],
    // color: { type: mongoose.Types.ObjectId, ref: "Color" },
    color: { type: String }, // tutaj musialem to zmienic do zapisywania kolorow bo wczesniej nie bylo colorPickera
    size: { type: mongoose.Types.ObjectId, ref: "Size" },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    used: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
export const Product = models.Product || model("Product", ProductSchema);
