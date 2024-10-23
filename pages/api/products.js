import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { User } from "@/models/User";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    const { id, userId } = req.query;
    if (id) {
      const product = await Product.findOne({ _id: id });
      return res.json(product);
    }
    if (userId) {
      const products = await Product.find({ user: userId });
      return res.json(products);
    }
    const products = await Product.find();
    return res.json(products);
  }
  if (method === "POST") {
    const {
      email,
      title,
      description,
      price,
      images,
      category,
      color,
      size,
      used,
    } = req.body;
    const user = await User.findOne({ email });
    const product = await Product.create({
      user: user._id,
      title,
      description,
      price,
      images,
      category: category || undefined,
      color: color || undefined,
      size: size || undefined,
      used,
    });
    return res.json(product);
  }
  if (method === "PUT") {
    const {
      title,
      description,
      price,
      images,
      category,
      color,
      size,
      used,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, color, size, used }
    );
    return res.json(true);
  }
  if (method === "DELETE") {
    const { id } = req.query;
    if (id) {
      await Product.deleteOne({ _id: id });
      return res.json(true);
    }
  }
}
