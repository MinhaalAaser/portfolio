import * as Dialog from "@radix-ui/react-dialog";
import { Lato } from "next/font/google";
import ContactModal from "../modals/ContactModal";
import { useContactModalStore } from "../zustand/contactSlice";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function ContactButton() {
	const modalState = useContactModalStore((state) => state.isOpen);
	const openModal = useContactModalStore((state) => state.openModal);
	const closeModal = useContactModalStore((state) => state.closeModal);

	return (
		<Dialog.Root
			open={modalState}
			onOpenChange={(open) => (open ? openModal() : closeModal())}
		>
			<Dialog.Trigger
				className={`text-xl px-6 py-3 mx-10 tracking-wider font-bold text-azb-5 bg-azg-2 rounded-md hover:bg-azb-1 hover:text-azg-2 ${lato.className}`}
			>
				Contact
			</Dialog.Trigger>

			<Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full" />
			<ContactModal />
		</Dialog.Root>
	);
}
