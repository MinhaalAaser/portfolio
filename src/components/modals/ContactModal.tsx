import * as Dialog from "@radix-ui/react-dialog";
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
		<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-azs-2 rounded-md p-6 w-screen z-[110] max-w-2xl">
			<Dialog.Title
				className={`${grenze.className} text-3xl text-shadow-md shadow-azb-5 tracking-wider text-azg-2 text-center my-4 font-bold`}
			>
				Contact Me
			</Dialog.Title>
			<form
				onSubmit={handleSubmit}
				className={`${lato.className} flex flex-col items-center text-lg tracking-wider justify-center`}
			>
				<input
					type="text"
					name="name"
					placeholder="Name"
					className="w-1/2  h-10 text-center m-4 rounded-md placeholder-text-azb-4 focus:placeholder-transparent"
				/>

				<input
					className="w-1/2 h-10 text-center m-4 rounded-md placeholder-text-azb-4 focus:placeholder-transparent"
					type="email"
					required
					name="email"
					placeholder="Email"
				/>

				<textarea
					className="w-3/4 h-40 text-center m-4 rounded-md p-2 text-black placeholder-text-azb-4 focus:text-margin-5 focus:text-left focus:placeholder-transparent"
					name="message"
					required
					placeholder="Type your message..."
				></textarea>

				<button
					className="px-4 py-2 m-5 text-azs-1 text-lg tracking-wider bg-azb-4 rounded-md hover:bg-azb-2"
					type="submit"
				>
					Submit Form
				</button>
			</form>
		</Dialog.Content>
	);
}
