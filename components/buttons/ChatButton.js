import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ChatButton() {
  const router = useRouter();
  const session = useSession();

  const [user, setUser] = useState(null);
  function handleAddClick() {
    if (session.status === "authenticated") {
      router.push("/chat");
      axios.put("/api/read");
    } else {
      toast.error("Log in to see your chats.");
    }
  }
  useEffect(() => {
    if (session.status === "authenticated") {
      axios
        .get("/api/users?id=" + session?.data?.user.id)
        .then((response) => setUser(response.data));
    }
  }, [session.status]);
  return (
    <div onClick={handleAddClick} className="cursor-pointer relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 sm:size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
      <div className="absolute -top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
        {user?.notifications}
      </div>
    </div>
  );
}
