import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export default function SearchButton() {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter;
  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  }
  return (
    <div className="relative flex items-center justify-center w-[300px]">
      <AnimatePresence mode="wait">
        {!search ? (
          <motion.div
            key="search-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-end"
          >
            <svg
              onClick={() => setSearch(true)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="search-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 items-center w-full justify-end"
          >
            <form onSubmit={handleSearch} className="flex gap-1 items-center">
              <input
                type="text"
                value={query}
                onChange={() => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="py-1 px-2 mb-0 rounded-md"
                autoFocus
              />
              <button type="submit" className="primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div className="cursor-pointer" onClick={() => setSearch(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { animate } from "framer-motion";
import { type } from "os";
import path from "path";
import { exit } from "process";
