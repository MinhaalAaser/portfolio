import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-grow">
				<Component {...pageProps} />
			</main>
			<Footer />
		</div>
	);
}
