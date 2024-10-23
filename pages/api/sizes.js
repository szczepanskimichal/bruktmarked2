import { mongooseConnect } from "@/lib/mongoose";
import { Size } from "@/models/Size";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.json(await Size.find());
  }
  if (method === "POST") {
    const { name } = req.body;
    const size = await Size.create({ name });
    res.json(size);
  }
  if (method === "PUT") {
    const { name, _id } = req.body;
    const size = await Size.updateOne({ _id }, { name });
    res.json(size);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Size.deleteOne({ _id });
    res.json("ok");
  }
}
