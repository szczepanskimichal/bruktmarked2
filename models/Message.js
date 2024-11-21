import mongoose, { model, models, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = models?.Message || model("Message", MessageSchema);
// po modelu zrobie api!!!
