import Header from "./Header";

export default function Layout({ children, title }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      {/* tutaj sa plamy na tle i wjezdzaja dzieci z informacjami */}
      <div className="min-h-screen pt-[60px] flex justify-center">
        <div className="bg-color-600 fixed top-[150px] left-[120px] w-[200px] sm:w-[300px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-color-600 fixed bottom-[120px] right-[100px] w-[200px] sm:w-[350px] h-[200px] rounded-full blur-[80px]" />
        <div className="bg-primary fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-[300px] sm:size-[500px] blur-[150px] rounded-full" />
        {/* tutaj sa dzieci przez brak klas mialem problem z loginem */}
        <div className="w-full p-5 backdrop-blur-md">
          <h2 className="my-5">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
