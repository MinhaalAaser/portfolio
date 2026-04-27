import { Hedvig_Letters_Sans } from "next/font/google";
import Image from "next/image";
import { useContactModalStore } from "../components/zustand/contactSlice";
import ContactButton from "./buttons/ContactButton";

const hedvig = Hedvig_Letters_Sans({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: false,
});

function Footer() {
	const modalState = useContactModalStore((state) => state.isOpen);
	return (
		<footer
			className={`mt-auto flex flex-col w-full items-center justify-center md:flex-row border-t-4 border-azg-1 bg-black p-4 ${hedvig.className}`}
		>
			<div className="flex w-full flex-wrap items-center justify-center gap-3 md:hidden">
				<p className="text-center text-xs tracking-wider text-azs-1">
					Copyright &copy; {new Date().getFullYear()} Aaser Zypher Solutions
				</p>
				<ContactButton variant="compact" />
				<section className="flex items-center justify-center gap-3">
					<a
						target="_blank"
						href="https://www.facebook.com/profile.php?id=61564678755375"
						rel="noopener noreferrer"
					>
						<Image
							src="/logos/Facebook-f_Logo-Blue-Logo.wine.svg"
							alt="Facebook"
							width={32}
							height={32}
						/>
					</a>
					<a
						target="_blank"
						href="https://github.com/MinhaalAaser"
						rel="noopener noreferrer"
					>
						<Image
							src="/logos/GitHub-Icon-White-Logo.wine.svg"
							alt="Github"
							width={32}
							height={32}
						/>
					</a>
					<a
						target="_blank"
						href="https://www.linkedin.com/in/minhaal-aaser/"
						rel="noopener noreferrer"
					>
						<Image
							src="/logos/LinkedIn-Icon-Logo.wine.svg"
							alt="Linkedin"
							width={32}
							height={32}
							className={modalState ? "filter-none" : "filter brightness-150"}
						/>
					</a>
				</section>
			</div>
			<p className="hidden text-center text-azs-1 tracking-wider md:block">
				Copyright &copy; {new Date().getFullYear()} Aaser Zypher Solutions
			</p>
			<div className="mt-4 hidden items-center md:ml-20 md:mt-0 md:flex">
				<span className="text-azs-1 tracking-wide">Powered by </span>
				<a
					href="https://nextjs.org/"
					className="ml-1 flex items-center"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						className={modalState ? "hidden" : "filter invert"}
						src="/logos/Next-js_Logo_0.svg"
						alt="Next.js Logo"
						width={72}
						height={16}
						priority
					/>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
