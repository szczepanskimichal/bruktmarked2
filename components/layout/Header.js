import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn } from "@/utils/motion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Hamburger from "../icons/Hamburger";
import X from "../icons/X";
import SearchButton from "../buttons/SearchButton";
import CartIcon from "../icons/CartIcon";
import UserButton from "../buttons/UserButton";

const links = ["Link1", "Link2", "Link3", "Link4"];

const Header = () => {
  const inactiveLink =
    "hover:text-primary cursor-pointer hover:scale-105 hover:decoration-primary decoration-color-800 underline underline-offset-4 transition-all delay-150 duration-300";
  const activeLink = inactiveLink.replace(
    "decoration-color-800",
    "decoration-white"
  );

  const [navOpen, setNavOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 w-full hidden lg:flex justify-around h-[60px] items-center bg-color-800 text-white z-[10] shadow-xl">
        <div>Logo</div>
        <nav className="flex gap-10">
          {/* {links.map((link) => (
            <div key={link} className={inactiveLink}>
              {link}
            </div>
          ))} */}
          <Link
            className={`
							${pathname === "/" ? activeLink : inactiveLink}`}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={`
							${pathname.includes("products") ? activeLink : inactiveLink}`}
            href={"/"}
          >
            All products
          </Link>
        </nav>
        <nav className="flex gap-10 items-center">
          <SearchButton />
          <UserButton />
          <Link href={"/product"} className="group">
            <div className="flex items-center h-[60px] relative transition-all delay-150 duration-300 group-hover:text-primary">
              <CartIcon className="size-7" />
              <div className="absolute top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
                0
              </div>
            </div>
          </Link>
        </nav>
      </header>
      <header
        className={`w-full lg:hidden fixed top-0 z-10 flex justify-around h-[60px] items-center transition delay-50 duration-500 shadow-xl ${
          navOpen ? "bg-color-900" : "bg-color-800"
        } text-white`}
      >
        <div className={inactiveLink} onClick={() => setNavOpen(true)}>
          <Hamburger />
        </div>
        <div data-scroll-to="#Hero">
          <img className="h-[70px] cursor-pointer" src="" alt="" />
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              variants={slideIn("left", "tween", 0, 0.5, false)}
              initial="hidden"
              whileInView="show"
              exit="exit"
              className="fixed z-10 top-0 left-0 h-screen bg-color-800 w-[60%] pl-[20px]"
            >
              <div
                onClick={() => setNavOpen(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                <X />
              </div>
              <div className="flex flex-col justify-between items-start mt-[100px]">
                <nav className="flex flex-col gap-10 justify-center mb-10 text-lg">
                  {links.map((link) => (
                    <div
                      // onClick={handleClick}
                      key={link}
                      className={inactiveLink}
                    >
                      {link}
                    </div>
                  ))}
                  <Link
                    onClick={() => setNavOpen(false)}
                    className={`
							${pathname === "/" ? activeLink : inactiveLink}`}
                    href={"/"}
                  >
                    PageLink
                  </Link>
                </nav>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
