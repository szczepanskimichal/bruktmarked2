import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className=" flex justify-center">
        <div className="bg-color-600 fixed top-[150px] left-[120px] w-[200px] sm:w-[300px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-color-600 fixed bottom-[120px] right-[100px] w-[200px] sm:w-[350px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-primary fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-[300px] sm:size-[500px] blur-[150px] rounded-full" />
        <div className="w-full p-5">{children}</div>
      </div>
    </div>
  );
}
