import Link from "next/link";

export default function IndexButton({ icon, href, text }) {
  return (
    // tutaj mam przyciski na glownej stronie
    <Link href={href} className="w-full">
      <button className="w-full flex justify-center items-center bg-white/60 border-2 border-color-500 text-color-800 hover:scale-100 hover:text-color-900 hover:bg-white">
        {icon} {text}
      </button>
    </Link>
  );
}
