import Head from "next/head";
import Image from "next/image";

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
			<main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
				<Image
					src="/az-content/ratesheet.webp"
					alt="Aaser Zypher Solutions web development rate sheet"
					width={1103}
					height={1426}
					priority={true}
					sizes="(max-width: 768px) 100vw, 1103px"
					className="h-auto w-full max-w-5xl rounded-md shadow-2xl shadow-azb-5/50"
				/>
			</main>
		</div>
	);
}

export default Pricing;
