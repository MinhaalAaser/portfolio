import { ArrowRight, Sparkles } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useContactModalStore } from "../components/zustand/contactSlice";

const grenze = Grenze({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});
const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
});

function About() {
	const toggleModal = useContactModalStore((state) => state.toggleModal);
	return (
		<div>
			<Head>
				<title>About me - Aaser Zypher.dev</title>
				<meta
					name="description"
					content="View more details about my life and work!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main
				className={`${lato.className} flex w-screen flex-col items-center justify-center mt-4`}
			>
				<h1
					className={`${grenze.className} text-azs-1 text-shadow-lg shadow-azb-5 mb-4 p-2 text-4xl font-bold tracking-wider sm:text-5xl`}
				>
					About Me
				</h1>
				<section className="grid grid-cols-1 items-center justify-center w-3/4 mb-4 md:grid md:grid-cols-2 md:gap-4 ">
					<Image
						src="/az-content/headshot2026.png"
						alt="Minhaal Aaser"
						width={500}
						height={500}
						className="mx-auto md:mx-0 mb-8 md:mb-0 rounded-full shadow-azg-1 shadow-lg"
					/>
					<p
						className={`${lato.className} text-azs-1 text-shadow-md shadow-azb-5 md:sm:ml-6 md:sm:text-left text-center text-xl tracking-wide`}
					>
						Hello! I&apos;m{" "}
						<span className="text-azg-2 text-shadow-md shadow-azb-5 ">
							Minhaal,
						</span>{" "}
						the mind behind{" "}
						<span
							className={`text-azg-2 tracking-wider text-shadow-md shadow-azb-5 text-xl${grenze.className}`}
						>
							AaserZypher.dev
						</span>
						<br /> <br /> Born and raised in the bustling city of Karachi,
						Pakistan, I&apos;ve always been captivated by the world of computers
						and technology. Fast forward to today, and you&apos;ll find me in
						the scenic landscapes of Wisconsin, USA—still glued to my screen,
						but with a purpose.
					</p>
				</section>
				<section>
					<p className="text-azs-1 text-shadow-md shadow-azb-5 md:sm:text-left text-center mx-10 my-4 text-xl font-medium tracking-wide">
						I&apos;ve worn many hats in my career journey: from sales floors to
						customer service counters, and even the buzzing environments of
						manufacturing and warehouse operations. Each role added a layer to
						my understanding of problem-solving and people—a combination
						that&apos;s crucial in tech. <br /> <br /> In May 2024, I graduated
						from{" "}
						<a href="https://bottega.edu/" className="text-azg-2">
							Bottega University
						</a>
						, determined to mix my lifelong passion with my professional
						pursuits. That&apos;s when{" "}
						<span className={`text-azg-2 tracking-wider ${grenze.className}`}>
							AaserZypher.dev
						</span>{" "}
						was born. Here, I offer Full Stack Web Development solutions that
						are as comprehensive as my journey—from A to Z.
					</p>
					<div className="mx-10 my-8 flex flex-col items-center justify-center gap-3 text-center md:items-start md:text-left">
						<p className="text-azs-1 text-shadow-md shadow-azb-5 text-xl font-medium tracking-wide">
							Have a site, product, or idea that needs momentum?
						</p>
						<button
							type="button"
							onClick={() => {
								toggleModal();
							}}
							className="group inline-flex items-center justify-center gap-3 rounded-md bg-azg-2 px-7 py-4 text-lg font-black uppercase tracking-wider text-azb-5 shadow-xl shadow-black/30 ring-2 ring-azg-1/80 transition duration-200 hover:-translate-y-1 hover:bg-azs-1 hover:shadow-azg-2/40 focus:outline-none focus:ring-4 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5 md:text-xl"
						>
							<Sparkles
								aria-hidden="true"
								className="h-5 w-5 transition group-hover:rotate-12"
							/>
							Start your build
							<ArrowRight
								aria-hidden="true"
								className="h-5 w-5 transition group-hover:translate-x-1"
							/>
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}

export default About;
