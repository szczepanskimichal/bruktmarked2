import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="min-h-screen pt-[40px] flex justify-center">
        <div className="bg-color-500 absolute top-[150px] left-[120px] w-[200px] sm:w-[300px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-color-500 absolute bottom-[120px] right-[100px] w-[200px] sm:w-[350px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-primary absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-[300px] sm:size-[500px] blur-[150px] rounded-full " />
        <div className="w-full p-5">{children}</div>
      </div>
    </div>
  );
}
