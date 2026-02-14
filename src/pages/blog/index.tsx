import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import BlogAuthButton from "@/components/buttons/BlogAuthButton";
import BlogAuthModal from "@/components/modals/BlogAuthModal";
import { useBlogStore } from "@/components/zustand/blogSlice";
import { blogExcerpt } from "@/lib/blogContent";

const grenze = Grenze({ weight: ["400", "600", "700"], subsets: ["latin"] });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function Blog() {
	const { posts, fetchPosts } = useBlogStore();

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return (
		<div>
			<Head>
				<title>Blog - Aaser Zypher.dev</title>
				<meta
					name="description"
					content="Weekly tidbits from my life or work that I find interesting."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main
				className={`${grenze.className} flex w-screen flex-col items-center justify-start py-10 px-4`}
			>
				<section className="relative bg-azg-1 px-4 rounded-2xl text-shadow-md shadow-azb-5 py-6 text-center mb-8">
					<h1 className="text-4xl font-bold text-azs-1 tracking-wider">Blog</h1>
					<div className="absolute left-48 top-1/2 -translate-y-1/2">
						<BlogAuthButton />
						<BlogAuthModal />
					</div>
				</section>
				{posts.length === 0 ? (
					<p className="text-xl tracking-wide text-azb-5">
						No posts available.
					</p>
				) : (
					<div className="grid gap-8 w-full max-w-3xl">
						{posts.map((post) => (
							<article
								key={post.slug}
								className="border border-azb-5 bg-azs-2 rounded-2xl shadow p-6 hover:shadow-lg transition"
							>
								<h2
									className={`${lato.className} text-2xl font-bold text-azb-4 bg-azs-3 hover:bg-azg-1 p-2 rounded-md mb-2`}
								>
									<Link href={`/blog/${post.slug}`}>{post.title}</Link>
								</h2>
								<p
									className={`${grenze.className} text-base text-gray-400 mb-3`}
								>
									{new Date(post.created_at).toLocaleDateString()}
								</p>
								<p className={`${lato.className} text-base text-gray-200 mb-6`}>
									{blogExcerpt(post.content)}
								</p>
								<Link
									href={`/blog/${post.slug}`}
									className="text-azb-5 text-end block  mt-4 font-semibold hover:underline"
								>
									Read More →
								</Link>
							</article>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
