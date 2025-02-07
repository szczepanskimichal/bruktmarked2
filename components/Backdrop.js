import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import X from "./icons/X";

export default function Backdrop({ children, handleClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0, rotate: 20 }}
        transition={{ ease: backInOut, duration: 0.5 }}
        className="bg-color-100 p-5 sm:p-10 rounded-md relative max-w-[20rem] sm:min-w-[30rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
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
        {children}
      </motion.div>
    </motion.div>
  );
}
