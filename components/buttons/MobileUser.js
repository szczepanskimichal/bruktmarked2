import UserIcon from "../icons/UserIcon";
import Link from "next/link";
import { useImage } from "@/hooks/useImage";
import { useSession } from "next-auth/react";
export default function MobileUser({ setNavOpen }) {
  const session = useSession();
  const { userImage, loading } = useImage();
  return (
    <Link onClick={() => setNavOpen(false)} href="/account/profile">
      {!loading && session.status !== loading && userImage ? (
        <div className="size-8 rounded-full flex justify-center items-center border-2 border-white">
          <img
            className="w-full h-full object-cover rounded-full cursor-pointer"
            src={userImage}
            alt=""
          />
        </div>
      ) : (
        <UserIcon className="size-7 cursor-pointer" />
      )}
    </Link>
  );
}
