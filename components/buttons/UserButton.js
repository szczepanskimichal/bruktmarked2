import UserIcon from "../icons/UserIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { slideIn } from "@/utils/motion";
import Link from "next/link";
import { useState } from "react";

export default function UserButton() {
  const [infoDiv, setInfoDiv] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  //funkcje do obslugi infoDiv do logowania i rejestracji
  const handleMouseEnterIcon = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setInfoDiv(true);
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
    <div className="relative flex justify-center">
      <div
        onMouseEnter={handleMouseEnterIcon}
        onMouseLeave={handleMouseLeaveIcon}
      >
        <UserIcon className="size-7 cursor-pointer" />
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
            <>
              <p className="text-center whitespace-nowrap">
                You're not authenticated
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
