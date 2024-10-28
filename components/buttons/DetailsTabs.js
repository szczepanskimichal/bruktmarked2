import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TabButton from "./TabButton";

export default function DetailsTabs({ product }) {
  const [activeTab, setActiveTab] = useState("Details");
  const tabContent = {
    Details: product.description,
    Shipping: "",
    Returns: "",
  };
  return (
    <>
      <div className="lg:w-[70%] border-b font-semibold text-gray-500 border-color-600 flex items-center w-full justify-between sm:justify-normal sm:gap-[100px] mb-5">
        {Object.keys(tabContent).map((tab) => (
          <TabButton
            key={tab}
            text={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <div className="lg:w-[60%] text-justify">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
