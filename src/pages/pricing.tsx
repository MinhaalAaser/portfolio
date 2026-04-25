import { Grenze } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const grenze = Grenze({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

function Pricing() {
	return (
		<div>
			<Head>
				<title>Pricing - Aaser Zypher.dev</title>
				<meta
					name="description"
					content="Pricing plans and details for my services."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex w-screen min-h-screen flex-col items-center justify-center">
				<a
					href="/az-content/Ratesheet.pdf"
					download
					className={`${grenze.className} text-azs-1 grid text-3xl text-shadow-md w-1/2 shadow-azb-5 grid-rows-1 text-center content-center items-center justify-center font-regular my-8 tracking-wider bg-azb-1 rounded-full`}
				>
					<span className="text-azg-2 mb-1">Download Ratesheet</span>
				</a>

				<section className="md:flex md:w-screen items-center justify-center grid grid-rows-1">
					<Image
						src="/az-content/pricing1.png"
						alt="Pricing1"
						width={450}
						height={400}
					/>
					<Image
						src="/az-content/pricing2.png"
						alt="Pricing2"
						width={450}
						height={400}
					/>
				</section>
			</main>
		</div>
	);
}

export default Pricing;
