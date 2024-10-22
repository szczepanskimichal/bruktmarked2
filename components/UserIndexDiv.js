import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function UserIndexDiv() {
  return (
    // tutaj mam powitanie na glownej stronie
    <motion.div
      variants={fadeIn("down", "spring", 0.1, 1)}
      initial="hidden"
      whileInView="show"
      className="relative"
    >
      <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-primary to-color-800 blur"></div>
      <div className="bg-white/60 sm:w-[500px] backdrop-blur-lg p-5 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl mb-7 font-semibold text-color-800">
          Welcome guest
        </h1>
        <div className="flex flex-col items-center">
          <h4 className="text-gray-500 text-xl">What are you up to today?</h4>
        </div>
      </div>
    </motion.div>
  );
}
