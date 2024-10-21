import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function Home() {
  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed bottom-[50px] left-[200px]"
        >
          <img src="nike.png" className="w-[400px]" alt="" />
        </motion.div>
        <motion.div
          variants={fadeIn("left", "spring", 0.7, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed top-[50px] right-[200px]"
        >
          <img src="nike2.png" className="w-[400px]" alt="" />
        </motion.div>
      </div>
    </Layout>
  );
}
