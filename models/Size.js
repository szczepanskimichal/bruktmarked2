import mongoose, { Schema, model, models } from "mongoose";

const SizeSchema = new Schema({
  name: { type: String, required: true },
});
export const Size = models?.Size || model("Size", SizeSchema);
