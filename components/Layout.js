import Header from "./Header";

export default function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-[100vh]">
			<Header />
			<div className="min-h-screen pt-[80px] flex justify-center">
				<div className="w-full p-5">{children}</div>
			</div>
		</div>
	);
}
