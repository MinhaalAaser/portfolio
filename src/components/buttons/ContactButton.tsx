import * as Dialog from "@radix-ui/react-dialog";
import { Lato } from "next/font/google";
import ContactModal from "../modals/ContactModal";
import { useContactModalStore } from "../zustand/contactSlice";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

type ContactButtonProps = {
	variant?: "default" | "compact";
};

export default function ContactButton({
	variant = "default",
}: ContactButtonProps) {
	const modalState = useContactModalStore((state) => state.isOpen);
	const openModal = useContactModalStore((state) => state.openModal);
	const closeModal = useContactModalStore((state) => state.closeModal);
	const triggerClass =
		variant === "compact"
			? "rounded-md bg-azg-2 px-3 py-2 text-sm font-bold tracking-wider text-azb-5 shadow-lg transition hover:bg-azs-1 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5"
			: "mx-10 rounded-md bg-azg-2 px-6 py-3 text-xl font-bold tracking-wider text-azb-5 shadow-lg transition hover:bg-azs-1 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5";

	return (
		<Dialog.Root
			open={modalState}
			onOpenChange={(open) => (open ? openModal() : closeModal())}
		>
			<Dialog.Trigger className={`${lato.className} ${triggerClass}`}>
				Contact
			</Dialog.Trigger>

			<Dialog.Overlay className="fixed inset-0 z-[100] flex w-full items-center justify-center bg-black/70 backdrop-blur-sm" />
			<ContactModal />
		</Dialog.Root>
	);
}
