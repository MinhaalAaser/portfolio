import { Menu, X } from "lucide-react";
import { Hedvig_Letters_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ContactButton from "./buttons/ContactButton";
import { useContactModalStore } from "./zustand/contactSlice";
import { useNavStore } from "./zustand/navSlice";

const hedvig = Hedvig_Letters_Sans({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: false,
});

function Header() {
	const navState = useNavStore((state) => state.isOpen);
	const toggleNav = useNavStore((state) => state.toggleMenu);
	const contactModalState = useContactModalStore((state) => state.isOpen);

	return (
		<header className="flex flex-col items-center justify-between">
			{/* Logo + Contact Button + Socials */}
			<div className="md:grid md:grid-cols-2 md:gap-4 flex items-center justify-center">
				<Link href="/">
					<Image
						src="/AZ-logo-nobg-2.svg"
						alt="Aaser Zypher.dev"
						width={300}
						height={300}
						priority={true}
						className="filter brightness-125"
					/>
				</Link>

				<section className="md:grid md:grid-rows-1 hidden md:gap-8 md:items-center justify-center">
					<ContactButton />

					{/* Socials */}
					<section className="grid grid-cols-3 gap-4 items-center justify-center">
						<a
							target="_blank"
							href="https://www.facebook.com/profile.php?id=61564678755375"
							rel="noopener"
						>
							<Image
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/640px-2023_Facebook_icon.svg.png"
								alt="Facebook"
								width={50}
								height={50}
							/>
						</a>
						<a
							target="_blank"
							href="https://github.com/MinhaalAaser"
							rel="noopener"
						>
							<Image
								src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
								alt="Github"
								className={contactModalState ? "filter-none" : "filter invert"}
								width={50}
								height={50}
							/>
						</a>
						<a
							target="_blank"
							href="https://www.linkedin.com/in/minhaal-aaser/"
							rel="noopener"
						>
							<Image
								src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
								alt="Linkedin"
								width={50}
								height={50}
								className={
									contactModalState ? "filter-none" : "filter brightness-150"
								}
							/>
						</a>
					</section>
				</section>
			</div>

			{/* Desktop Nav */}
			<div
				className={`hidden md:grid gap-2 grid-flow-col items-center justify-center mb-4 md:gap-4 md:grid-cols-5 ${hedvig.className}`}
			>
				{["Home", "About", "Portfolio", "Blog", "Pricing"].map((item) => (
					<Link
						key={item}
						href={`/${item === "Home" ? "" : item.toLowerCase()}`}
						className="flex items-center justify-center tracking-wider px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
					>
						{item}
					</Link>
				))}
			</div>

			{/* Mobile Nav Toggle */}
			<div className="md:hidden p-2 flex items-center justify-center">
				<button
					type="button"
					onClick={toggleNav}
					className="p-2 text-azg-2 text-shadow-lg shadow-azb-5 bg-azb-1 rounded-full mb-4 hover:text-azb-1 hover:bg-azg-2 focus:outline-none md:mb-0"
				>
					{navState ? <X size={48} /> : <Menu size={48} />}
				</button>
			</div>

			{/* Mobile Nav Links */}
			{navState && (
				<div
					className={`flex flex-col gap-2 items-center justify-center ${hedvig.className} mt-6 md:hidden `}
				>
					{["Home", "About", "Portfolio", "Blog", "Pricing"].map((item) => (
						<Link
							key={item}
							href={`/${item === "Home" ? "" : item.toLowerCase()}`}
							className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
							onClick={toggleNav}
						>
							{item}
						</Link>
					))}
				</div>
			)}
		</header>
	);
}

export default Header;
