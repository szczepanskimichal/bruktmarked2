import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);
  const email = session.user.email;
  const user = await User.findOne({ email });
  const { _id } = req.query;

  if (req.method === "POST") {
    try {
      user.wishlist.push(_id);
      await user.save(); // Zapisujemy zmiany w bazie danych
      res.status(200).json(user.wishlist);
      console.log(user.wishlist);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  if (req.method === "GET") {
    const user = await User.findOne({ email }).populate("wishlist"); // Pobieramy użytkownika z listą życzeń - w skrucie
    res.status(200).json(user.wishlist);
  }
  if (req.method === "DELETE") {
    user.wishlist = user.wishlist.filter(
      (productId) => productId.toString() !== _id
    );
    await user.save();
    return res.json(true);
  }
}
