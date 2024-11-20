import { useSession } from "next-auth/react";
import { useState } from "react";
export default function Chat({
  conversations,
  setConversations,
  activeConversation,
  setActiveConversations,
  messages,
  sendMessage,
}) {
  const [content, setContent] = useState("");
  const session = useSession();
  const userId = session?.data?.user.id;
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-xl rounded-tr-xl mb-0 font-semibold px-5 py-3 bg-color-50">
        {(activeConversation &&
          conversations.find((c) => c._id === activeConversation)?.name) ||
          conversations.find((c) => c._id === activeConversation)?.email}
      </h3>
      <div className="p-3 flex flex-col gap-2 flex-grow overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`px-4 py-2 rounded-full max-w-[50%] ${
              message.sender._id === userId
                ? "bg-color-300 self-end text-right"
                : "bg-gray-100 self-start text-left"
            }`}
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e, content);
          setContent("");
        }}
        className="p-3 bg-color-50 rounded-br-xl border-t border-color-400 flex items-center gap-2"
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
        />
      </form>
    </div>
  );
}
