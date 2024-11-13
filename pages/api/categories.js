import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.json(await Category.find().sort({ name: 1 }));
  }
  if (method === "POST") {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json(category);
  }
  if (method === "PUT") {
    const { name, _id } = req.body;
    const category = await Category.updateOne({ _id }, { name });
    res.json(category);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
