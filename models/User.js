import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }], // do przechowywania listy zyczen, bedzie zlaczone z userem
    notifications: { type: Number, default: 0 }, // do przechowywania ilosci powiadomien!!!
  },
  {
    timestamps: true,
  }
);
// export const User = models?.User || model("User", UserSchema);
export const User = models.User || model("User", UserSchema);
