import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import ContactModal from "@/components/modals/ContactModal";
import { useContactModalStore } from "@/components/zustand/contactSlice";

const grenze = Grenze({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
});
const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
});

function Pricing() {
	const modalState = useContactModalStore((state) => state.isOpen);
	const openModal = useContactModalStore((state) => state.openModal);
	const closeModal = useContactModalStore((state) => state.closeModal);

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
			<main className="flex min-h-screen w-full flex-col items-center px-4 pb-16 pt-4 text-azs-1 sm:px-6 lg:px-8">
				<section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center">
					<h1
						className={`${grenze.className} text-azs-1 text-shadow-lg shadow-azb-5 p-2 text-center text-4xl font-bold tracking-wider sm:text-5xl`}
					>
						Pricing
					</h1>
					<p
						className={`${lato.className} max-w-2xl text-lg leading-8 text-azs-2`}
					>
						Clear project pricing for focused, responsive web development work.
						Review the rate sheet below, then reach out when you are ready to
						talk through the right fit.
					</p>
					<div className="mb-4 flex flex-col items-center gap-3 sm:flex-row">
						<p
							className={`${lato.className} text-xl font-bold tracking-wide text-azs-1 text-shadow-md shadow-azb-5`}
						>
							Questions?
						</p>
						<Dialog.Root
							open={modalState}
							onOpenChange={(open) => (open ? openModal() : closeModal())}
						>
							<Dialog.Trigger
								className={`${lato.className} inline-flex items-center justify-center gap-3 rounded-md bg-azg-2 px-6 py-3 text-lg font-black uppercase tracking-wider text-azb-5 shadow-xl shadow-black/30 ring-2 ring-azg-1/80 transition duration-200 hover:-translate-y-1 hover:bg-azs-1 hover:shadow-azg-2/40 focus:outline-none focus:ring-4 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5`}
							>
								<MessageCircle aria-hidden="true" className="h-5 w-5" />
								Contact Today!
								<ArrowRight aria-hidden="true" className="h-5 w-5" />
							</Dialog.Trigger>
							<Dialog.Overlay className="fixed inset-0 z-[100] flex w-full items-center justify-center bg-black/70 backdrop-blur-sm" />
							<ContactModal />
						</Dialog.Root>
					</div>
				</section>
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
