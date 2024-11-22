import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Chat({
  conversations,
  setConversations,
  activeConversation,
  setActiveConversation,
  messages,
  sendMessage,
}) {
  const [content, setContent] = useState("");
  const session = useSession();
  const userId = session?.data?.user.id;

  useEffect(() => {
    if (userId) {
      axios.get("/api/messages").then((response) => {
        // console.log(response.data);
        const conversations = response.data.conversations;
        setConversations(conversations);
        const latestConversation = conversations.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0];
        // console.log(activeConversation);
        if (latestConversation) {
          setActiveConversation(latestConversation._id); // ustawiam aktywna konwersacje,
          // widac ja teraz na glowny po kliknieciu w ikone i jak wracasz to tez jestem na kstynej rozmowie
        }
      });
    }
  }, [userId]);

  return (
    <div className="w-full flex flex-col">
      {/* // gorny pasek */}
      <h3 className="text-xl rounded-tr-xl mb-0 font-semibold px-5 py-3 bg-color-50">
        {(activeConversation &&
          conversations.find((c) => c._id === activeConversation)?.name) ||
          conversations.find((c) => c._id === activeConversation)?.email}
      </h3>
      {/* // wiadomosci tlo*/}
      <div className="p-3 flex flex-col gap-2 flex-grow overflow-auto">
        {messages.map((message) => (
          // tutaj jest wyswietlanie wiadomosci
          <div className="flex flex-col">
            <div
              key={message._id}
              className={`px-4 py-2 rounded-full max-w-[50%] ${
                message.sender._id === userId
                  ? "bg-color-300 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
              // to jest do jakby zawijania wiadomosci zeby ladnie wygladalo
              style={{
                overflowWrap: "break-word",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e, content);
          setContent("");
        }}
        className="p-3 bg-color-50 rounded-br-xl border-t border-color-400 flex items-center gap-2" // background dla paska inputu na dole
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-3xl"
        >
          Send
        </button>
      </form>
    </div>
  );
}
