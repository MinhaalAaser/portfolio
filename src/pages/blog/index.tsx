import { ArrowUpRight, CalendarDays, PenLine } from "lucide-react";
import { Grenze, Lato } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import BlogAuthButton from "@/components/buttons/BlogAuthButton";
import BlogAuthModal from "@/components/modals/BlogAuthModal";
import BlogPostModal from "@/components/modals/BlogPostModal";
import { useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";
import { blogPreview, normalizeBlogContent } from "@/lib/blogContent";

const grenze = Grenze({ weight: ["400", "600", "700"], subsets: ["latin"] });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function Blog() {
	const {
		posts,
		hasLoaded,
		isLoading,
		loadError,
		fetchPosts,
		isManager,
		syncAccessToken,
		openModal,
		setEditingPostSlug,
		setModalTitle,
		setModalContent,
		setModalKeywords,
		deletePost,
		fetchWithAuth,
		clearAccessToken,
	} = useBlogStore();

	useEffect(() => {
		fetchPosts();
		syncAccessToken();
	}, [fetchPosts, syncAccessToken]);

	const openNewPostModal = (): void => {
		setEditingPostSlug(null);
		setModalTitle("");
		setModalContent("");
		setModalKeywords("");
		openModal();
	};

	const openEditModal = (
		title: string,
		content: string,
		keywords: string,
		slug: string,
	): void => {
		setEditingPostSlug(slug);
		setModalTitle(title);
		setModalContent(normalizeBlogContent(content));
		setModalKeywords(keywords);
		openModal();
	};

	const handleDelete = async (slug: string): Promise<void> => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			const res = await fetchWithAuth(blogApiUrl(slug), {
				method: "DELETE",
			});

			if (!res) {
				clearAccessToken();
				alert("Session expired. Please log in again.");
				return;
			}

			if (res.ok) {
				deletePost(slug);
			}
		} catch (err) {
			console.error(err);
		}
	};

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

			<main className="min-h-screen w-full px-4 pb-16 pt-10 text-azs-1 sm:px-6 lg:px-8">
				<section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
					<div className="space-y-8">
						<h1
							className={`${grenze.className} text-center text-4xl font-bold leading-tight text-azs-1 text-shadow-md shadow-azb-5 sm:text-5xl`}
						>
							Blog
						</h1>
						<p
							className={`${lato.className} max-w-2xl text-lg leading-8 text-azs-2`}
						>
							Notes from the build process, practical web development lessons,
							and the occasional useful thought from behind the keyboard.
						</p>
					</div>
					<div className="flex flex-wrap items-center justify-start gap-3">
						<BlogAuthButton />
						{isManager && (
							<button
								type="button"
								className={`${lato.className} inline-flex min-w-36 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-azg-2 px-5 py-3 text-base font-bold text-azb-5 shadow-lg transition hover:bg-azs-1 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5`}
								onClick={openNewPostModal}
							>
								<PenLine size={18} />
								New Post
							</button>
						)}
						<BlogAuthModal />
					</div>
				</section>
				{(!hasLoaded || isLoading) && posts.length === 0 ? (
					<section
						className="mx-auto mt-10 max-w-5xl rounded-lg border border-white/25 bg-azb-5/60 p-8 text-center shadow-xl shadow-azb-5/30 backdrop-blur-xl"
						aria-live="polite"
					>
						<p className={`${lato.className} text-xl tracking-wide text-azs-2`}>
							Loading blog posts...
						</p>
					</section>
				) : loadError ? (
					<section className="mx-auto mt-10 max-w-5xl rounded-lg border border-white/25 bg-azb-5/60 p-8 text-center shadow-xl shadow-azb-5/30 backdrop-blur-xl">
						<p className={`${lato.className} text-xl tracking-wide text-azs-2`}>
							{loadError}
						</p>
						<button
							type="button"
							className={`${lato.className} mt-5 rounded-md bg-azg-2 px-5 py-3 font-bold text-azb-5 shadow-lg transition hover:bg-azs-1 focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5`}
							onClick={() => fetchPosts(true)}
						>
							Try again
						</button>
					</section>
				) : posts.length === 0 ? (
					<section className="mx-auto mt-10 max-w-5xl rounded-lg border border-white/25 bg-azb-5/60 p-8 text-center shadow-xl shadow-azb-5/30 backdrop-blur-xl">
						<p className={`${lato.className} text-xl tracking-wide text-azs-2`}>
							No posts available.
						</p>
					</section>
				) : (
					<div className="mx-auto mt-10 grid w-full max-w-5xl gap-5">
						{posts.map((post) => (
							<article
								key={post.slug}
								className={`${lato.className} group flex min-h-72 flex-col rounded-lg border border-white/25 bg-azb-5/55 p-6 shadow-xl shadow-azb-5/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-azg-2 hover:bg-azb-4/70`}
							>
								<div className="mb-4 flex items-center gap-3">
									<p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-azg-2">
										<CalendarDays size={16} />
										{new Date(post.created_at).toLocaleDateString()}
									</p>
								</div>
								<h2
									className={`${grenze.className} mb-3 text-2xl font-bold leading-tight text-azs-1`}
								>
									<Link href={`/blog/${post.slug}`}>{post.title}</Link>
								</h2>
								<p className="mb-6 leading-7 text-azs-2">
									{blogPreview(post.content)}
								</p>
								<Link
									href={`/blog/${post.slug}`}
									aria-label={`Read more about ${post.title}`}
									className="mt-auto inline-flex w-fit items-center gap-2 self-end rounded-md bg-azg-2 px-4 py-2 font-bold text-azb-5 transition hover:bg-azs-1"
								>
									Read More
									<ArrowUpRight size={18} />
								</Link>
								{isManager && (
									<div className="mt-4 flex gap-2">
										<button
											type="button"
											className="rounded-md border border-white/20 bg-white/10 px-3 py-2 font-bold text-azs-1 hover:bg-azb-3"
											onClick={() =>
												openEditModal(
													post.title,
													post.content,
													post.keywords || "",
													post.slug,
												)
											}
										>
											Edit
										</button>
										<button
											type="button"
											className="rounded-md border border-white/20 bg-white/10 px-3 py-2 font-bold text-azs-1 hover:bg-azb-3"
											onClick={() => handleDelete(post.slug)}
										>
											Delete
										</button>
									</div>
								)}
							</article>
						))}
					</div>
				)}
				<BlogPostModal />
			</main>
		</div>
	);
}
