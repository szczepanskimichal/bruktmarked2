import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import UserIndexDiv from "@/components/layout/UserIndexDiv";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session.user);
  return (
    // tutaj mam zdjecia na glownej stronie
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed bottom-0 left-[200px] "
        >
          <img src="nike.png" className="w-[400px]" alt="" />
        </motion.div>
        <motion.div
          variants={fadeIn("left", "spring", 0.7, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed top-[50px] right-[200px]"
        >
          <img src="nike2.png" className="w-[400px] scale-x-[-1]" alt="" />
        </motion.div>
        <UserIndexDiv user={session?.data?.user} />
      </div>
    </Layout>
  );
}
