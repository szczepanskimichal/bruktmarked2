import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountTab({ href, text, icon }) {
  // to jest komponent, ktory jest uzywany w AccountLayout.js, ktory jest uzywany w pages/products.js
  const pathname = usePathname();
  return (
    <Link
      href={`/account/${href}`}
      className={`cursor-pointer rounded-lg flex gap-3 p-2 justify-center items-center w-full transition-all hover:-translate-y-1 delay-150 duration-300 text-lg ${
        pathname.includes(href)
          ? "bg-color-800/50 text-white -translate-y-1"
          : "bg-color-800/20 text-color-800"
      }`}
    >
      {icon}
      <span className="sm:flex hidden">{text}</span>
    </Link>
  );
}
