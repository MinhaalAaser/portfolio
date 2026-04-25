import { Lato } from "next/font/google";
import { useBlogStore } from "@/components/zustand/blogSlice";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

function BlogAuthButton() {
	const { openAuthModal, getAccessToken, syncAccessToken } = useBlogStore((state) => ({
		openAuthModal: state.openAuthModal,
		getAccessToken: state.getAccessToken,
		syncAccessToken: state.syncAccessToken,
	}));

	const handleClick = () => {
		const token = getAccessToken();
		if (token) {
			syncAccessToken();
			return;
		}

		openAuthModal();
	};

	return (
		<button
			type="button"
			className={`${lato.className} whitespace-nowrap bg-azs-2 hover:bg-azg-2 text-azb-4 text-lg py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out`}
			onClick={handleClick}
		>
			Manage Blog
		</button>
	);
}

export default BlogAuthButton;
