import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Message } from "@/models/Message";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  try {
    if (method === "GET") {
      const messages = await Message.find({
        $or: [{ sender: userId }, { recipient: userId }],
      })
        .populate("sender", "email image name")
        .populate("recipient", "email image name");
      const conversations = messages.reduce((acc, message) => {
        const partner =
          message.sender._id.toString() === userId
            ? message.recipient
            : message.sender;
        let existingConversation = acc.find(
          (conv) => conv._id.toString() === partner._id.toString()
        );
        if (existingConversation) {
          if (
            message.createdAt > existingConversation.latestMessage.createdAt
          ) {
            existingConversation.latestMessage = message;
          }
        } else {
          acc.push({ ...partner._doc, latestMessage: message });
        }
        return acc;
      }, []);
      const sortedConversations = conversations.sort(
        (a, b) => b.latestMessage.createdAt - a.latestMessage.createdAt
      );
      const { recipientId } = req.query;
      if (recipientId) {
        const conversationMessages = messages.filter(
          (msg) =>
            (msg.sender._id.toString() === userId &&
              msg.recipient._id.toString() === recipientId) ||
            (msg.sender._id.toString() === recipientId &&
              msg.recipient._id.toString() === userId)
        );
        return res.status(200).json({ conversationMessages });
      }
      return res.status(200).json({ conversations: sortedConversations });
    }
    if (method === "POST") {
      const { recipient, content } = req.body;
      if (!recipient || !content) {
        return res
          .status(400)
          .json({ error: "recipient and content are required" });
      }
      const message = await Message.create({
        sender: userId,
        recipient,
        content,
      });
      return res.status(201).json(message);
    }
  } catch (error) {
    console.error("Error handling messages:", error);
    res.status(500).json({ error: "Error processing request" });
  }
}
