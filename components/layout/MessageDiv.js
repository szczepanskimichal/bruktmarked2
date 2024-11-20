import { useSession } from "next-auth/react";

export default function MessageDiv({
  conversation,
  activeConversation,
  setActiveConversation,
  setRecipient,
}) {
  const session = useSession();
  const user = session?.data?.user.id;
  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <div
      onClick={() => {
        setActiveConversation(conversation._id);
        setRecipient(conversation._id);
      }}
      className={`flex gap-3 py-3 px-5 cursor-pointer ${
        activeConversation === conversation._id && "bg-color-200"
      }`}
    >
      <div className="size-10 rounded-full flex justify-center items-center bg-white">
        <img
          className="w-full h-full object-cover rounded-full"
          src={conversation.image}
          alt=""
        />
      </div>
      <div className="flex-1">
        <h4 className="whitespace-nowrap font-semibold">
          {conversation.name || conversation.email}
        </h4>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {conversation.latestMessage.sender._id === user && "You:"}{" "}
            {conversation.latestMessage.content}
          </p>
          <p className="text-sm text-gray-500">
            {formatTime(conversation.latestMessage.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
