import { slideIn } from "@/utils/motion";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileCategories({
  inactiveLink,
  activeLink,
  setNavOpen,
}) {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <>
      <div onClick={() => setShowCategories((prev) => !prev)}>Categories</div>
      <AnimatePresence>
        {showCategories && (
          <div className="pl-3 flex flex-col gap-5">
            {categories?.map((category, index) => (
              <motion.div
                variants={slideIn("left", "spring", 0.1 * index, 1, true)}
                initial="hidden"
                whileInView="show"
                exit="exit"
              >
                <Link
                  onClick={() => setNavOpen(false)}
                  key={category._id}
                  className={
                    pathname.includes("/categories/" + category._id)
                      ? activeLink
                      : inactiveLink
                  }
                  href={"/categories/" + category._id}
                >
                  {category.name}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
