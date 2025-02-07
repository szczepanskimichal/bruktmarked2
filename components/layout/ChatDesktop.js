// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Chat({
//   conversations,
//   setConversations,
//   activeConversation,
//   setActiveConversation,
//   messages,
//   sendMessage,
//   reload,
// }) {
//   const [content, setContent] = useState("");
//   const [showTime, setShowTime] = useState(null);

//   const session = useSession();
//   const userId = session?.data?.user.id;

//   const formatTime = (date) => {
//     const d = new Date(date);
//     return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   function handleTimeClick(id) {
//     if (showTime === null) {
//       setShowTime(id);
//     } else {
//       setShowTime(null);
//     }
//   }

//   useEffect(() => {
//     if (userId) {
//       axios.get("/api/messages").then((response) => {
//         const conversations = response.data.conversations;
//         setConversations(conversations);
//         const latestConversation = conversations.sort(
//           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//         )[0];
//         if (latestConversation) {
//           setActiveConversation(latestConversation._id);
//         }
//       });
//     }
//   }, [userId, reload]);

//   return (
//     <div className="w-full flex flex-col">
//       <h3 className="text-xl rounded-tr-xl mb-0 font-semibold px-5 py-3 bg-color-50">
//         {(activeConversation &&
//           conversations.find((c) => c._id === activeConversation)?.name) ||
//           conversations.find((c) => c._id === activeConversation)?.email}
//       </h3>
//       <div className="p-3 flex flex-col gap-2 flex-grow overflow-auto">
//         {messages.map((message, index) => (
//           <div key={index} className="flex flex-col">
//             <div
//               onClick={() => handleTimeClick(message._id)}
//               key={message._id}
//               className={`px-4 py-2 rounded-3xl max-w-[50%] ${
//                 message.sender._id === userId
//                   ? "bg-color-300 self-end text-right"
//                   : "bg-gray-100 self-start text-left"
//               }`}
//               style={{
//                 overflowWrap: "break-word",
//                 wordWrap: "break-word",
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {message.content}
//             </div>
//             <AnimatePresence mode="wait">
//               {showTime === message._id && (
//                 <motion.div
//                   layout
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2, ease: "easeInOut" }}
//                   className={`text-sm text-gray-500 mx-2 my-1 ${
//                     message.sender._id === userId
//                       ? "self-end text-right"
//                       : "self-start text-left"
//                   }`}
//                 >
//                   {formatTime(message.updatedAt)}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>
//       <form
//         onSubmit={(e) => {
//           sendMessage(e, content);
//           setContent("");
//         }}
//         className="p-3 bg-color-50 rounded-br-xl border-t border-color-400 flex items-center gap-2"
//       >
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-primary text-white rounded-3xl"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Chat({
  conversations,
  setConversations,
  activeConversation,
  setActiveConversation,
  messages = [], // Domyślna wartość, aby zapobiec błędom
  sendMessage,
  reload,
}) {
  const [content, setContent] = useState("");
  const [showTime, setShowTime] = useState(null);

  const session = useSession();
  const userId = session?.data?.user.id;

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  function handleTimeClick(id) {
    if (showTime === null) {
      setShowTime(id);
    } else {
      setShowTime(null);
    }
  }

  useEffect(() => {
    if (userId) {
      axios.get("/api/messages").then((response) => {
        const conversations = response.data.conversations || [];
        setConversations(conversations);
        const latestConversation = conversations.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0];
        if (latestConversation) {
          setActiveConversation(latestConversation._id);
        }
      });
    }
  }, [userId, reload]);

  return (
    <div className="w-full flex flex-col">
      <h3 className="text-xl rounded-tr-xl mb-0 font-semibold px-5 py-3 bg-color-50">
        {(activeConversation &&
          conversations.find((c) => c._id === activeConversation)?.name) ||
          conversations.find((c) => c._id === activeConversation)?.email}
      </h3>
      <div className="p-3 flex flex-col gap-2 flex-grow overflow-auto">
        {Array.isArray(messages) &&
          messages.map((message, index) => (
            <div key={index} className="flex flex-col">
              <div
                onClick={() => handleTimeClick(message._id)}
                key={message._id}
                className={`px-4 py-2 rounded-3xl max-w-[50%] ${
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
              <AnimatePresence mode="wait">
                {showTime === message._id && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`text-sm text-gray-500 mx-2 my-1 ${
                      message.sender._id === userId
                        ? "self-end text-right"
                        : "self-start text-left"
                    }`}
                  >
                    {formatTime(message.updatedAt)}
                  </motion.div>
                )}
              </AnimatePresence>
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
          className="flex-grow px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none"
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
