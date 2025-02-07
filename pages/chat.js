import Backdrop from "@/components/Backdrop";
import Aside from "@/components/layout/AsideDesktop";
import AsideMobile from "@/components/layout/AsideMobile";
import Chat from "@/components/layout/ChatDesktop";
import ChatMobile from "@/components/layout/ChatMobile";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import { AnimatePresence, backInOut, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChatPage() {
  const [createMessage, setCreateMessage] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [reload, setReload] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeConversationMobile, setActiveConversationMobile] =
    useState(null);

  const session = useSession();
  const userId = session?.data?.user.id;

  async function sendMessage(e, messageContent = content) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/messages", {
        recipient,
        content: messageContent,
      });
      if (response.status === 201) {
        setContent("");
        setCreateMessage(false);
        setReload(!reload);
      }
    } catch (error) {
      toast.error("Error while sending a message.");
      console.error("Message sending error:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      axios.get("/api/users").then((response) => {
        setUsers(response.data);
      });
      axios.get("/api/messages").then((response) => {
        setConversations(response.data.conversations);
      });

      if (activeConversation) {
        axios
          .get(`/api/messages?recipientId=${activeConversation}`)
          .then((response) => {
            setMessages(response.data.conversationMessages);
          });
        setRecipient(activeConversation);
      }
    }
  }, [userId, activeConversation, reload]);

  return (
    <>
      <AnimatePresence>
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
      </AnimatePresence>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChatOpen(false)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-5 py-10 sm:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ ease: backInOut, duration: 0.5 }}
              className="bg-white rounded-xl relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setChatOpen(false)}
                className="hover:scale-100 absolute bg-color-100 p-1 rounded-full -top-3 -left-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <ChatMobile
                conversations={conversations}
                setConversations={setConversations}
                activeConversation={activeConversationMobile}
                setActiveConversation={setActiveConversationMobile}
                messages={messages}
                sendMessage={sendMessage}
                reload={reload}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Layout>
        <div className="w-full h-full sm:h-[81vh] flex justify-center">
          <div className="rounded-xl hidden sm:flex shadow-xl bg-white w-[80%]">
            <Aside
              setCreateMessage={setCreateMessage}
              conversations={conversations}
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              setRecipient={setRecipient}
            />
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
          <div className="rounded-xl sm:hidden flex shadow-xl bg-white w-full">
            <AsideMobile
              setCreateMessage={setCreateMessage}
              conversations={conversations}
              activeConversation={activeConversationMobile}
              setActiveConversation={setActiveConversationMobile}
              setRecipient={setRecipient}
              setChatOpen={setChatOpen}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
