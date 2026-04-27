import { ArrowLeft, CalendarDays, Tags } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogMarkdown from "@/components/blog/BlogMarkdown";
import { type Post, useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";
import { normalizeBlogContent } from "@/lib/blogContent";

const grenze = Grenze({ weight: ["400", "600", "700"], subsets: ["latin"] });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function BlogPost() {
	const router = useRouter();
	const { slug } = router.query;
	const { posts } = useBlogStore();

	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) return;
		const slugValue = Array.isArray(slug) ? slug[0] : slug;
		if (!slugValue) return;

		const localPost = posts.find((p) => p.slug === slugValue);
		if (localPost) {
			setPost({
				...localPost,
				content: normalizeBlogContent(localPost.content),
			});
			setLoading(false);
			return; // stop here, no fetch needed
		}

		setLoading(true);

		(async () => {
			try {
				const res = await fetch(blogApiUrl(encodeURIComponent(slugValue)), {
					cache: "no-store",
				});
				if (!res.ok) throw new Error("Post not found");
				const data = await res.json();
				const fetchedPost: Post = data.post ?? data;
				setPost({
					...fetchedPost,
					content: normalizeBlogContent(fetchedPost.content),
				});
			} catch (err) {
				console.error(err);
				setPost(null);
			} finally {
				setLoading(false);
			}
		})();
	}, [slug, posts]);

	if (loading)
		return (
			<main
				className={`${lato.className} min-h-screen px-4 pt-10 text-center text-xl text-azs-2`}
			>
				Loading...
			</main>
		);
	if (!post)
		return (
			<main
				className={`${lato.className} min-h-screen px-4 pt-10 text-center text-xl text-azg-2`}
			>
				Post not found.
			</main>
		);

	return (
		<>
			<Head>
				<title>{post.title} - Aaser Zypher.dev Blog</title>
				<meta name="description" content={post.title} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className="min-h-screen w-full px-4 pb-16 pt-10 text-azs-1 sm:px-6 lg:px-8">
				<article className="mx-auto flex max-w-4xl flex-col gap-6">
					<Link
						href="/blog"
						className={`${lato.className} inline-flex w-fit items-center gap-2 rounded-md border border-white/25 bg-azb-5/60 px-4 py-2 font-bold text-azg-2 backdrop-blur-xl transition hover:border-azg-2 hover:bg-azb-4`}
					>
						<ArrowLeft size={18} />
						Blog
					</Link>

					<header className="rounded-lg border border-white/25 bg-azb-5/60 p-6 shadow-2xl shadow-azb-5/40 backdrop-blur-xl sm:p-8">
						<h1
							className={`${grenze.className} text-4xl font-bold leading-tight text-azs-1 text-shadow-md shadow-azb-5 sm:text-5xl`}
						>
							{post.title}
						</h1>

						<div
							className={`${lato.className} mt-5 flex flex-wrap items-center gap-3 text-sm font-bold text-azs-2`}
						>
							<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-azg-2">
								<CalendarDays size={16} />
								Created on {new Date(post.created_at).toLocaleDateString()}
							</span>

							{post.keywords && (
								<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-azs-1">
									<Tags size={16} />
									{post.keywords}
								</span>
							)}
						</div>
					</header>

					<div
						className={`${lato.className} rounded-lg border border-white/25 bg-azb-5/60 p-6 shadow-xl shadow-azb-5/30 backdrop-blur-xl sm:p-8`}
					>
						<BlogMarkdown content={post.content} />
					</div>
				</article>
			</main>
		</>
	);
}
