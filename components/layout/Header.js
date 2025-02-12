import React, { useState, useEffect, useContext } from "react";
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
import { CartContext } from "@/hooks/CartContext";
import { useSession, signOut } from "next-auth/react";
import CategoriesLink from "../buttons/CategoriesLink";
import MobileCategories from "../buttons/MobileCategories";
import ChatButton from "../buttons/ChatButton";
import MobileUser from "../buttons/MobileUser";

const links = ["Link1", "Link2", "Link3", "Link4"];

const Header = () => {
  const inactiveLink =
    "hover:text-primary cursor-pointer hover:scale-105 hover:decoration-primary decoration-color-800 underline underline-offset-4 transition-all delay-150 duration-300";
  const activeLink = inactiveLink.replace(
    "decoration-color-800",
    "decoration-white"
  );

  const [navOpen, setNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext); // do wyswietlania ilosci produktow w koszyku

  const router = useRouter(); // do  sciezki!!!
  const pathname = usePathname();

  const session = useSession();
  console.log(session);

  return (
    <>
      {/* responsywny layout!!!na tablety i kompy */}
      <header className="fixed top-0 w-full hidden lg:flex justify-around h-[60px] items-center bg-color-800 text-white z-[10] shadow-xl">
        <div>Logo</div>
        <nav className="flex gap-10">
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
            href={"/products"}
          >
            All products
          </Link>
          <CategoriesLink inactiveLink={inactiveLink} activeLink={activeLink} />
        </nav>
        <nav className="flex gap-10 items-center">
          <SearchButton />
          {session?.status === "authenticated" && <ChatButton />}
          <UserButton />
          <Link href={"/cart"}>
            <div className="flex items-center h-[60px] relative transition-all delay-150 duration-300 ">
              <CartIcon className="size-7" href="/cart" />
              <div className="absolute top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs ">
                {cartProducts.length}
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
        <div>Logo</div>
        <Link href={"/cart"} className="group">
          <div className="flex items-center h-[60px] relative transition-all delay-150 duration-300 group-hover:text-primary">
            <CartIcon className="size-7" />
            <div className="absolute top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
              {cartProducts.length}
            </div>
          </div>
        </Link>
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              variants={slideIn("left", "tween", 0, 0.5, false)}
              initial="hidden"
              whileInView="show"
              exit="exit"
              className="fixed z-10 top-0 left-0 h-screen bg-color-800 w-[70%] px-[20px]"
            >
              <div className="absolute flex gap-7 items-center top-5 left-5">
                <MobileUser setNavOpen={setNavOpen} />
                <ChatButton />
              </div>
              <div
                onClick={() => setNavOpen(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                <X />
              </div>
              {/* zawartosc mobilnego menu */}
              <div className="flex flex-col h-full justify-between items-start pt-[100px] pb-5">
                <nav className="flex flex-col gap-10 justify-center mb-10 text-lg">
                  <Link
                    className={`${
                      pathname === "/" ? activeLink : inactiveLink
                    }`}
                    href={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    className={`${
                      pathname.includes === "/products"
                        ? activeLink
                        : inactiveLink
                    }`}
                    href={"/products"}
                  >
                    All products
                  </Link>
                  <MobileCategories
                    inactiveLink={inactiveLink}
                    activeLink={activeLink}
                    setNavOpen={setNavOpen}
                  />
                  <div
                    onClick={() => setNavOpen(false)}
                    className="mt-10 flex flex-col gap-10"
                  >
                    {session?.status === "authenticated" ? (
                      <div onClick={signOut}>Logout</div>
                    ) : (
                      <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                      </>
                    )}
                  </div>
                </nav>
                <SearchButton />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
