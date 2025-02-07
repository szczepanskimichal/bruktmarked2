import UserIcon from "../icons/UserIcon";
import { AnimatePresence, motion } from "framer-motion";
import { slideIn } from "@/utils/motion";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useImage } from "@/hooks/useImage";

export default function UserButton() {
  const [infoDiv, setInfoDiv] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const session = useSession();
  const { userImage, loading } = useImage();

  //funkcje do obslugi infoDiv do logowania i rejestracji
  const handleMouseEnterIcon = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    // Ustawiam timeout, który po 250 ms pokaże element informacyjny
    const timeout = setTimeout(() => {
      setInfoDiv(true); // Ustawia stan wyświetlenia elementu informacyjnego na true
    }, 250);
    // Przechowujemy referencję do timeoutu, aby móc go później anulować, jeśli zajdzie taka potrzeba
    setHoverTimeout(timeout);
  };
  const handleMouseLeaveIcon = () => {
    const timeout = setTimeout(() => {
      setInfoDiv(false);
    }, 500);
    setHoverTimeout(timeout);
  };
  const handleMouseEnterInfo = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  return (
    <div className="relative flex justify-center cursor-pointer">
      <div
        onMouseEnter={handleMouseEnterIcon}
        onMouseLeave={handleMouseLeaveIcon}
      >
        {/* zdjecie uzytkownika!!! */}
        {!loading && session.status !== loading && userImage ? (
          <div className="size-8 rounded-full flex justify-center items-center border-2 border-white">
            <img
              className="w-full h-full object-cover rounded-full"
              src={userImage}
              alt=""
            />
          </div>
        ) : (
          <UserIcon className="size-7 cursor-pointer" />
        )}
      </div>
      <AnimatePresence>
        {infoDiv && (
          <motion.div
            variants={slideIn("top", "tween", 0, 0.5, true)}
            initial="hidden"
            whileInView="show"
            className="absolute flex flex-col items-center gap-3 top-10 bg-color-700 rounded-md p-3"
            onMouseEnter={handleMouseEnterInfo}
            onMouseLeave={() => setInfoDiv(false)}
          >
            {session.status === "authenticated" ? (
              <>
                <p className="text-center whitespace-nowrap">
                  Logged in as
                  <span className="underline decoration-primary text-color-200">
                    {session.data.user.email}
                  </span>
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <button className="primary flex justify-center w-full">
                    <Link href={"/account/profile"}>Manage your profile</Link>
                  </button>
                  <button
                    onClick={signOut}
                    className="bg-color-300 text-black flex justify-center w-full"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-center whitespace-nowrap">
                  You&apos;re not authenticated
                </p>
                <div className="flex flex-col gap-3 items-center w-full">
                  <button className="primary flex justify-center w-full">
                    <Link href={"/login"}>Login</Link>
                  </button>
                  <button className="bg-color-300 text-black flex justify-center w-full">
                    <Link href={"/register"}>Register</Link>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
