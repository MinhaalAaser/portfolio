import { ArrowUpRight } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolioProjects";

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
});
const grenze = Grenze({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
});

function Portfolio() {
	return (
		<div>
			<Head>
				<title>Portfolio - Aaser Zypher.dev</title>
				<meta
					name="description"
					content="Explore selected web development projects, case studies, screenshots, and outcomes from Aaser Zypher.dev."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen w-full overflow-hidden px-4 pb-16 text-azs-1 sm:px-6 lg:px-8">
				<h1
					className={`${grenze.className} text-azs-1 text-shadow-lg shadow-azb-5 mx-auto mb-2 mt-4 p-2 text-center text-4xl font-bold tracking-wider sm:text-5xl`}
				>
					Portfolio
				</h1>
				<section className="mx-auto max-w-6xl py-8">
					<div className="space-y-5">
						<h2
							className={`${grenze.className} max-w-3xl text-2xl font-bold leading-tight text-azs-1 text-shadow-md shadow-azb-5 sm:text-3xl lg:text-4xl`}
						>
							Web experiences built to be fast, clear, and worth clicking.
						</h2>
						<p
							className={`${lato.className} max-w-2xl text-lg leading-8 text-azs-2`}
						>
							A practical look at shipped interfaces, content systems, and
							client-ready pages. Each project is organized as a case study so
							the work can stand on design, implementation, and measurable
							quality.
						</p>
					</div>
				</section>

				<section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
					{portfolioProjects.map((project) => (
						<Link
							key={project.slug}
							href={`/portfolio/${project.slug}`}
							className={`${lato.className} group flex min-h-[34rem] flex-col overflow-hidden rounded-lg border border-white/25 bg-azb-5/55 shadow-xl shadow-azb-5/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-azg-2 hover:bg-azb-4/70 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5`}
						>
							<div
								className={`relative aspect-[16/10] ${
									project.imageBackground ?? "bg-azb-5/70"
								}`}
							>
								<Image
									src={project.image}
									alt={`${project.title} screenshot`}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
									className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
								/>
							</div>
							<div className="flex flex-1 flex-col gap-4 p-5">
								<div className="flex items-center justify-between gap-3">
									<div className="flex flex-wrap gap-2">
										{(project.categoryTags ?? [project.category]).map((tag) => (
											<span
												key={tag}
												className="rounded-full bg-azg-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-azb-5"
											>
												{tag}
											</span>
										))}
									</div>
									<ArrowUpRight
										className="text-azg-2 transition group-hover:translate-x-1 group-hover:-translate-y-1"
										size={22}
									/>
								</div>
								<h2 className="text-2xl font-bold leading-tight text-azs-1">
									{project.title}
								</h2>
								<p className="leading-7 text-azs-2">{project.summary}</p>
								<div className="mt-auto flex flex-wrap gap-2 pt-2">
									{project.stack.map((item) => (
										<span
											key={item}
											className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs font-bold text-azs-1"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</Link>
					))}
				</section>
			</main>
		</div>
	);
}

export default Portfolio;
