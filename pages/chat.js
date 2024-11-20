import Backdrop from "@/components/Backdrop";
import Layout from "@/components/layout/Layout";
import { useState } from "react";

export default function ChatPage() {
  const [createMessage, setCreateMessage] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  return (
    <>
      {createMessage && (
        <Backdrop handleClose={() => setCreateMessage(false)}>
          <h3 className="primary">Start a new conversation</h3>
          <form onSubmit={() => {}}>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            >
              <option value="">Select an user</option>
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
        <div className="w-full h-full flex justify-center">
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
            </aside>
          </div>
        </div>
      </Layout>
    </>
  );
}
