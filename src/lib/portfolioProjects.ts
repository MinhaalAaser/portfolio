export type PortfolioProject = {
	slug: string;
	title: string;
	category: string;
	categoryTags?: string[];
	summary: string;
	description: string;
	image: string;
	imageBackground?: string;
	resultImage?: {
		src: string;
		alt: string;
	};
	screenshots?: {
		src: string;
		alt: string;
	}[];
	year: string;
	role: string;
	stack: string[];
	highlights: string[];
	outcomes: string[];
	links?: {
		label: string;
		href: string;
	}[];
};

export const portfolioProjects: PortfolioProject[] = [
	{
		slug: "portfolio-platform",
		title: "Aaser Zypher.dev Portfolio Platform",
		category: "Personal Brand",
		summary:
			"A responsive Next.js portfolio built to present services, writing, pricing, and case studies from one polished home base.",
		description:
			"This site acts as the central client-facing platform: a focused homepage, services-oriented pricing content, contact flows, blog publishing, and now a case-study portfolio system.",
		image: "/az-content/AZ-logo-nobg-2.svg",
		resultImage: {
			src: "/az-content/AZ-Lighthouse.webp",
			alt: "Aaser Zypher.dev Lighthouse performance report",
		},
		screenshots: [
			{
				src: "/az-content/AZ-Screenshot.webp",
				alt: "Aaser Zypher.dev homepage screenshot",
			},
		],
		year: "2025",
		role: "Full-stack developer",
		stack: [
			"React",
			"Next.JS",
			"Tailwind CSS",
			"RadixUI",
			"Zustand",
			"Flask",
			"PostgresSQL",
			"Docker",
		],
		highlights: [
			"Built a cohesive multi-page experience around a custom brand palette.",
			"Added reusable navigation, contact modal flows, and structured page metadata.",
			"Organized the site so portfolio work can grow into SEO-friendly case studies.",
		],
		outcomes: [
			"Clearer path from visitor interest to contact.",
			"More durable content model for future project launches.",
			"Better visual polish without losing fast static-page behavior.",
		],
	},
	{
		slug: "life-organized",
		title: "Life Organized",
		category: "Single Page App",
		categoryTags: ["Single Page App", "Progressive Web App"],
		summary:
			"Create Kanban boards and lists to organize your life from one clean interface.",
		description:
			"Life Organized is a single-page productivity experience designed to make planning feel simple, fast, and usable across devices.",
		image: "/az-content/LO-Logo.webp",
		imageBackground: "bg-los-logo",
		resultImage: {
			src: "/az-content/LO-Lightroom.webp",
			alt: "Life Organized Lighthouse performance report",
		},
		screenshots: [
			{
				src: "/az-content/LO-BoardsView.webp",
				alt: "Life Organized boards view screenshot",
			},
		],
		year: "2026",
		role: "Full-Stack Developer",
		stack: [
			"React",
			"Next.JS",
			"Tailwind CSS",
			"RadixUI",
			"Zustand",
			"FastAPI",
			"PostgresSQL",
			"Docker",
		],
		highlights: [
			"Built a compact app experience around fast task entry and everyday planning.",
			"Structured the interface for mobile-first use while preserving desktop clarity.",
			"Prepared the app for progressive web app behavior and repeat daily use.",
		],
		outcomes: [
			"Clearer daily planning flow from one focused screen.",
			"Install-friendly app direction for quick access on mobile devices.",
			"A flexible foundation for future productivity features.",
		],
		links: [
			{
				label: "Visit site",
				href: "https://life-organized.aaserzypher.dev",
			},
		],
	},
	// {
	// 	slug: "blog-publishing-flow",
	// 	title: "Blog Publishing Flow",
	// 	category: "Content System",
	// 	summary:
	// 		"A slug-based blog experience with markdown rendering and API-backed post loading.",
	// 	description:
	// 		"The blog system supports individual post URLs, markdown rendering, local state, and API fallback behavior so writing can live beside the portfolio and service pages.",
	// 	image: "/az-content/pricing2.png",
	// 	year: "2026",
	// 	role: "Full-stack developer",
	// 	stack: ["Next.js", "React Markdown", "Zustand", "API integration"],
	// 	highlights: [
	// 		"Implemented dynamic post routes for shareable long-form content.",
	// 		"Normalized markdown content before rendering to keep display consistent.",
	// 		"Added loading and not-found states for more resilient navigation.",
	// 	],
	// 	outcomes: [
	// 		"Search-friendly URLs for individual posts.",
	// 		"A stronger foundation for thought leadership and technical writing.",
	// 		"Reusable route structure for portfolio case-study pages.",
	// 	],
	// 	links: [
	// 		{
	// 			label: "Read blog",
	// 			href: "/blog",
	// 		},
	// 	],
	// },
];

export function getPortfolioProject(slug: string) {
	return portfolioProjects.find((project) => project.slug === slug);
}
