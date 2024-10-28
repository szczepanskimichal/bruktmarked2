export default function TabButton({ text, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-sm flex gap-3 justify-center items-center border-b-4 transition delay-150 duration-300 text-xl ${
        isActive ? "border-primary text-color-900" : "border-transparent"
      }`}
    >
      <span className="flex">{text}</span>
    </div>
  );
}
