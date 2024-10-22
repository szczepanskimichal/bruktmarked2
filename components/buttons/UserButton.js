import UserIcon from "../icons/UserIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { slideIn } from "@/utils/motion";
import Link from "next/link";
import { useState } from "react";

export default function UserButton() {
  const [infoDiv, setInfoDiv] = useState(true);
  return (
    <div className="relative flex justify-center">
      <div>
        <UserIcon className="size-7 cursor-pointer" />
      </div>
      <AnimatePresence>{infoDiv && (
        <motion.div
        variants={slideIn('top','tween', 0, 0.5, true)}
        initial='hidden'
        whileInView='show'
        className='absolute flex flex-col items-center gap-3 top-10 bg-color-700 rounded-md p-3'
        >

        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}
