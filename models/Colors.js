import mongoose, { Schema, model, models } from "mongoose";
const ColorSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});
export const Color = models?.Color || model("Color", ColorSchema);
