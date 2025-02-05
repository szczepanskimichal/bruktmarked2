import Backdrop from "@/components/Backdrop";
import Layout from "@/components/layout/Layout";
import Chat from "@/components/layout/Chat";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import MessageDiv from "@/components/layout/MessageDiv";

export default function ChatPage() {
  const [createMessage, setCreateMessage] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const session = useSession();
  const userId = session?.data?.user.id;

  async function sendMessage(e, messageContent = content) {
    // mialem problemy bo co? jak zwykle nie napisalem Api a pozniej jeszcze cos sknocilem
    e.preventDefault();
    // if (!recipient || !content) {
    //   toast.error("Recipient and content are required");
    //   return;
    // }
    try {
      const response = await axios.post("/api/messages", {
        recipient,
        content: messageContent,
      });
      if (response.status === 201) {
        setContent(""); //pust
        setCreateMessage(false); // zamykam modal
        // toast.success("Message sent succesfully!"); // wezme to zakomentuje, bo to glupie jak piszesz i caly czas wywala komunikat
        //o udanym wyslaniu wiadomosci, niech sie wyswietla tylko jak sie cos nie uda :)
        setReload(!reload); // odswiezam
      }
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending message", error);
    }
  }

  useEffect(() => {
    // mozliwosc wybierania USERA!!! ta ale pamietaj ze musisz miec api/users.js zrobione!!!
    if (userId) {
      axios.get("/api/users").then((response) => {
        setUsers(response.data);
      });
      axios.get("/api/messages").then((response) => {
        // pobieram konwersacje
        setConversations(response.data.conversations);
      });
      if (activeConversation) {
        axios
          .get(`/api/messages?recipientId=${activeConversation}`) // pobieram wiadomosci
          .then((response) => {
            setMessages(response.data.conversationMessages); // ustawiam wiadomosci
          });
      }
    }
  }, [userId, activeConversation, reload]); // odswiezam po zmianie

  // console.log(users);

  return (
    <>
      {createMessage && (
        <Backdrop handleClose={() => setCreateMessage(false)}>
          <h3 className="primary">Start a new conversation</h3>
          <form onSubmit={sendMessage}>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            >
              <option value="">Select an user</option>
              {/* wyswietlanie userow!!!bez zalogowanego */}
              {users
                ?.filter((user) => user._id !== userId)
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || user.email}
                  </option>
                ))}
            </select>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full flex justify-center bg-color-800 text-white"
            >
              Send
            </button>
          </form>
        </Backdrop>
      )}
      <Layout>
        <div className="w-full h-[80vh] flex justify-center">
          {/* mialem problem z paskiem przewijania bo sie nie wyswietlal, ale dalem tutaj ograniczenie wysokosci i smiga */}
          <div className="rounded-xl flex shadow-xl bg-white w-[80%]">
            <aside className="h-full rounded-l-xl bg-color-50 border-r border-color-400 min-w-[30%]">
              <div className="flex items-center justify-between p-5">
                <h2 className="text-2xl mb-0">Messages</h2>
                <div
                  className="cursor-pointer"
                  onClick={() => setCreateMessage(true)} // Open the backdrop, to write a new message!!!
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                {conversations?.length > 0 &&
                  conversations.map((conversation) => (
                    <MessageDiv
                      conversation={conversation}
                      key={conversation._id}
                      activeConversation={activeConversation}
                      setActiveConversation={setActiveConversation}
                      setRecipient={setRecipient}
                    />
                  ))}
              </div>
            </aside>
            <Chat
              conversations={conversations}
              setConversations={setConversations}
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              messages={messages}
              sendMessage={sendMessage}
              reload={reload}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
