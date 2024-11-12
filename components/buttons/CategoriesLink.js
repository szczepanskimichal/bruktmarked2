import { slideIn } from "@/utils/motion";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesLink({ inactiveLink, activeLink }) {
  const [categories, setCategories] = useState([]);
  const [categoriesShow, setCategoriesShow] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  const handleMouseEnterIcon = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setCategoriesShow(true);
  };
  const handleMouseLeaveIcon = () => {
    const timeout = setTimeout(() => {
      setCategoriesShow(false);
    }, 500);
    setHoverTimeout(timeout);
  };
  const handleMouseEnterCategories = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  // pamietaj do wyswietlenia produktow potrzebujesz api id!!!
  return (
    <>
      <div
        onMouseEnter={handleMouseEnterIcon}
        onMouseLeave={handleMouseLeaveIcon}
        className={`${inactiveLink} relative cursor-pointer`}
      >
        Categories
      </div>
      <AnimatePresence>
        {categoriesShow && (
          <motion.div
            onMouseEnter={handleMouseEnterCategories}
            onMouseLeave={() => setCategoriesShow(false)}
            variants={slideIn("down", "tween", 0.1, 0.3, true)}
            initial="hidden"
            whileInView="show"
            exit="exit"
            className="flex justify-center absolute bg-color-800 w-full top-[60px] left-0 shadow-xl border-t border-color-300"
          >
            <div className="w-full grid grid-cols-4 gap-x-10 gap-y-1 px-[100px] py-3">
              {categories?.map((category) => (
                <Link
                  className={
                    pathname.includes("/categories/" + category._id)
                      ? activeLink
                      : inactiveLink
                  }
                  href={"/categories/" + category._id}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
