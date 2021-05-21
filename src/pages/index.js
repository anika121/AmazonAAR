import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon</title>
			</Head>

			<Header /> 

			<main className="mx-auto max-w-screen-2xl">
				<Banner />
			</main>
		</div>
	);
}
