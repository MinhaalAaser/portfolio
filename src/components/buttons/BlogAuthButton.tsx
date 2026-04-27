import { Lato } from "next/font/google";
import { useBlogStore } from "@/components/zustand/blogSlice";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

function BlogAuthButton() {
	const { openAuthModal, getAccessToken, syncAccessToken } = useBlogStore(
		(state) => ({
			openAuthModal: state.openAuthModal,
			getAccessToken: state.getAccessToken,
			syncAccessToken: state.syncAccessToken,
		}),
	);

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
			className={`${lato.className} whitespace-nowrap rounded-md border border-white/25 bg-azb-5/60 px-5 py-3 text-base font-bold text-azg-2 shadow-lg backdrop-blur-xl transition duration-300 ease-in-out hover:border-azg-2 hover:bg-azb-4 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5`}
			onClick={handleClick}
		>
			Manage Blog
		</button>
	);
}

export default BlogAuthButton;
