import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import type { FormEvent } from "react";
import { useContactModalStore } from "../zustand/contactSlice";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });
const grenze = Grenze({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export default function ContactModal() {
	const closeModal = useContactModalStore((state) => state.closeModal);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);

		formData.append("access_key", "a36f3058-9f5e-4e43-bd1f-930c123ea325");

		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json,
		});
		const result = await response.json();
		if (result.success) {
			console.log(result);
			alert("Thanks for contacting me! I will get back to you soon.");
			closeModal();
		} else {
			console.log(result);
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<Dialog.Content className="fixed left-1/2 top-1/2 z-[110] max-h-[90vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-white/25 bg-azb-5/90 p-6 text-azs-1 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
			<Dialog.Title
				className={`${grenze.className} my-4 text-center text-3xl font-bold tracking-wider text-azg-2 text-shadow-md shadow-azb-5 sm:text-4xl`}
			>
				Contact Aaser Zypher Solutions
			</Dialog.Title>
			<form
				onSubmit={handleSubmit}
				className={`${lato.className} mx-auto flex max-w-xl flex-col items-stretch justify-center gap-4 text-lg tracking-wider`}
			>
				<input
					type="text"
					name="name"
					placeholder="Name"
					className="min-h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-azs-1 placeholder:text-azs-4 focus:outline-none focus:ring-2 focus:ring-azg-2"
				/>

				<input
					className="min-h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-azs-1 placeholder:text-azs-4 focus:outline-none focus:ring-2 focus:ring-azg-2"
					type="email"
					required
					name="email"
					placeholder="Email"
				/>

				<textarea
					className="min-h-40 w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-azs-1 placeholder:text-azs-4 focus:outline-none focus:ring-2 focus:ring-azg-2"
					name="message"
					required
					placeholder="Type your message..."
				></textarea>

				<button
					className="mt-2 w-full rounded-md bg-azg-2 px-4 py-3 text-lg font-bold tracking-wider text-azb-5 transition hover:bg-azs-1 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5"
					type="submit"
				>
					Submit Form
				</button>
			</form>
			<Dialog.Close asChild>
				<button
					type="button"
					className="absolute right-3 top-3 rounded-md border border-white/20 bg-white/10 p-2 text-azg-2 transition hover:bg-azb-4 focus:outline-none focus:ring-2 focus:ring-azg-2"
					aria-label="Close contact form"
				>
					<X size={20} />
				</button>
			</Dialog.Close>
		</Dialog.Content>
	);
}
