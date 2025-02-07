import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "PUT") {
    const session = await getSession({ req });
    const userId = session.user.id;
    console.log(userId);
    const user = await User.findByIdAndUpdate(userId, { notifications: 0 });
    return res.json(true);
  }
}
