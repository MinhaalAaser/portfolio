import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
	getPortfolioProject,
	type PortfolioProject,
	portfolioProjects,
} from "@/lib/portfolioProjects";

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
});
const grenze = Grenze({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
});

type PortfolioDetailProps = {
	project: PortfolioProject;
};

export const getStaticPaths: GetStaticPaths = () => ({
	paths: portfolioProjects.map((project) => ({
		params: { slug: project.slug },
	})),
	fallback: false,
});

export const getStaticProps: GetStaticProps<PortfolioDetailProps> = ({
	params,
}) => {
	const slug = typeof params?.slug === "string" ? params.slug : "";
	const project = getPortfolioProject(slug);

	if (!project) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			project,
		},
	};
};

export default function PortfolioDetail({ project }: PortfolioDetailProps) {
	return (
		<div>
			<Head>
				<title>{project.title} - Aaser Zypher.dev Portfolio</title>
				<meta name="description" content={project.summary} />
				<meta property="og:title" content={project.title} />
				<meta property="og:description" content={project.summary} />
				<meta property="og:image" content={project.image} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen w-full px-4 pb-16 text-azs-1 sm:px-6 lg:px-8">
				<article className="mx-auto max-w-6xl">
					<Link
						href="/portfolio"
						className={`${lato.className} mb-6 inline-flex items-center gap-2 rounded-md border border-white/25 bg-azb-5/60 px-4 py-2 font-bold text-azg-2 backdrop-blur-xl transition hover:border-azg-2 hover:bg-azb-4`}
					>
						<ArrowLeft size={18} />
						Portfolio
					</Link>

					<section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
						<div className="space-y-5">
							<div className="flex flex-wrap gap-2">
								{(project.categoryTags ?? [project.category]).map((tag) => (
									<p
										key={tag}
										className="w-fit rounded-full bg-azg-2 px-4 py-2 text-sm font-bold uppercase tracking-wider text-azb-5"
									>
										{tag}
									</p>
								))}
							</div>
							<h1
								className={`${grenze.className} text-4xl font-bold leading-tight text-azs-1 text-shadow-md shadow-azb-5 sm:text-5xl`}
							>
								{project.title}
							</h1>
							<p className={`${lato.className} text-lg leading-8 text-azs-2`}>
								{project.description}
							</p>
							<div
								className={`${lato.className} grid gap-3 rounded-lg border border-white/25 bg-azb-5/60 p-4 backdrop-blur-xl sm:grid-cols-2`}
							>
								<div>
									<span className="text-sm font-bold uppercase tracking-wider text-azg-2">
										Role
									</span>
									<p className="mt-1 text-azs-1">{project.role}</p>
								</div>
								<div>
									<span className="text-sm font-bold uppercase tracking-wider text-azg-2">
										Year
									</span>
									<p className="mt-1 text-azs-1">{project.year}</p>
								</div>
							</div>
						</div>
						<div
							className={`relative aspect-[16/10] overflow-hidden rounded-lg border border-white/25 ${
								project.imageBackground ?? "bg-azb-5/65"
							} shadow-2xl shadow-azb-5/40 backdrop-blur-xl`}
						>
							<Image
								src={project.image}
								alt={`${project.title} screenshot`}
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-contain p-6"
							/>
						</div>
					</section>

					<section className="mt-8 grid gap-5 lg:grid-cols-3">
						<div
							className={`${lato.className} rounded-lg border border-white/25 bg-azb-5/60 p-5 backdrop-blur-xl lg:col-span-2`}
						>
							<h2
								className={`${grenze.className} text-2xl font-bold text-azg-2`}
							>
								Project Highlights
							</h2>
							<div className="mt-5 grid gap-4">
								{project.highlights.map((highlight) => (
									<p
										key={highlight}
										className="grid grid-cols-[1.5rem_1fr] gap-3 leading-7 text-azs-2"
									>
										<CheckCircle2 className="mt-1 text-azg-2" size={20} />
										<span>{highlight}</span>
									</p>
								))}
							</div>
						</div>
						<aside
							className={`${lato.className} rounded-lg border border-white/25 bg-azb-5/60 p-5 backdrop-blur-xl`}
						>
							<h2
								className={`${grenze.className} text-2xl font-bold text-azg-2`}
							>
								Stack
							</h2>
							<div className="mt-5 flex flex-wrap gap-2">
								{project.stack.map((item) => (
									<span
										key={item}
										className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-azs-1"
									>
										{item}
									</span>
								))}
							</div>
							{project.links && (
								<div className="mt-6 grid gap-3">
									{project.links.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className="inline-flex items-center justify-center gap-2 rounded-md bg-azg-2 px-4 py-3 font-bold text-azb-5 transition hover:bg-azs-1"
										>
											{link.label}
											<ArrowUpRight size={18} />
										</Link>
									))}
								</div>
							)}
						</aside>
					</section>

					<section
						className={`${lato.className} mt-5 rounded-lg border border-white/25 bg-azb-5/60 p-5 backdrop-blur-xl`}
					>
						<h2 className={`${grenze.className} text-2xl font-bold text-azg-2`}>
							Outcomes
						</h2>
						<div className="mt-5 grid gap-3 md:grid-cols-3">
							{project.outcomes.map((outcome) => (
								<p
									key={outcome}
									className="rounded-md border border-white/15 bg-white/10 p-4 leading-7 text-azs-2"
								>
									{outcome}
								</p>
							))}
						</div>
					</section>

					<section
						className={`${lato.className} mt-5 rounded-lg border border-white/25 bg-azb-5/60 p-5 backdrop-blur-xl`}
					>
						<h2 className={`${grenze.className} text-2xl font-bold text-azg-2`}>
							Lighthouse Results
						</h2>
						{project.resultImage ? (
							<div className="relative mt-5 aspect-[1998/1180] overflow-hidden rounded-md border border-white/15 bg-white">
								<Image
									src={project.resultImage.src}
									alt={project.resultImage.alt}
									fill
									sizes="(max-width: 1152px) 100vw, 1152px"
									className="object-contain"
								/>
							</div>
						) : (
							<p className="mt-5 rounded-md border border-white/15 bg-white/10 p-4 leading-7 text-azs-2">
								Lighthouse results will be added here as this case study is
								expanded.
							</p>
						)}
					</section>

					{project.screenshots && project.screenshots.length > 0 && (
						<section
							className={`${lato.className} mt-5 rounded-lg border border-white/25 bg-azb-5/60 p-5 backdrop-blur-xl`}
						>
							<h2
								className={`${grenze.className} text-2xl font-bold text-azg-2`}
							>
								App Screenshots
							</h2>
							<div className="mt-5 grid gap-4">
								{project.screenshots.map((screenshot) => (
									<div
										key={screenshot.src}
										className="relative aspect-[1888/868] overflow-hidden rounded-md border border-white/15 bg-white"
									>
										<Image
											src={screenshot.src}
											alt={screenshot.alt}
											fill
											sizes="(max-width: 1152px) 100vw, 1152px"
											className="object-contain"
										/>
									</div>
								))}
							</div>
						</section>
					)}
				</article>
			</main>
		</div>
	);
}
