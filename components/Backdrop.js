import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import X from "./icons/X";

export default function Backdrop({ children, handleClose }) {
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <motion.div
        variants={fadeIn("down", "spring", 0, 1)}
        initial="hidden"
        whileInView="show"
        exit="exit"
        className="bg-color-100 p-10 rounded-md relative"
      >
        <button
          onClick={handleClose}
          className="hover:scale-100 absolute bg-color-100 p-1 rounded-full -top-3 -left-3"
        >
          <X />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
