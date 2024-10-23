import { mongooseConnect } from "@/lib/mongoose";
import { Color } from "@/models/Color";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.json(await Color.find());
  }
  if (method === "POST") {
    const { name, value } = req.body;
    const color = await Color.create({ name, value });
    res.json(color);
  }
  if (method === "PUT") {
    const { name, value, _id } = req.body;
    const color = await Color.updateOne({ _id }, { name, value });
    res.json(color);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Color.deleteOne({ _id });
    res.json("ok");
  }
}
