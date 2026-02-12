import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type Post, useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";
import BlogPostModal from "../../components/modals/BlogPostModal";

export default function BlogAdmin(): JSX.Element {
	const router = useRouter();
	const {
		posts,
		openModal,
		setEditingPostSlug,
		setModalTitle,
		setModalContent,
		setModalKeywords,
		deletePost,
		setPosts,
		getValidAccessToken,
		refreshAccessToken,
		clearAccessToken,
	} = useBlogStore();

	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const requestWithAuth = async (
			input: RequestInfo | URL,
			init: RequestInit = {},
		): Promise<Response | null> => {
			let token = await getValidAccessToken();
			if (!token) return null;

			let res = await fetch(input, {
				...init,
				headers: {
					...(init.headers ?? {}),
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.status !== 401) return res;

			token = await refreshAccessToken();
			if (!token) return null;

			res = await fetch(input, {
				...init,
				headers: {
					...(init.headers ?? {}),
					Authorization: `Bearer ${token}`,
				},
			});
			return res;
		};

		const initializeAdmin = async () => {
			try {
				const res = await requestWithAuth(blogApiUrl("/"));
				if (!isMounted) return;

				if (!res || !res.ok) {
					clearAccessToken();
					setIsAuthorized(false);
					router.replace("/blog");
					return;
				}

				const data: Post[] = await res.json();
				setPosts(data);
				setIsAuthorized(true);
			} catch (err) {
				console.error(err);
				if (isMounted) {
					clearAccessToken();
					setIsAuthorized(false);
					router.replace("/blog");
				}
			} finally {
				if (isMounted) setIsCheckingAuth(false);
			}
		};

		initializeAdmin();

		return () => {
			isMounted = false;
		};
	}, [
		getValidAccessToken,
		refreshAccessToken,
		clearAccessToken,
		router,
		setPosts,
	]);

	const openNewPostModal = (): void => {
		const prepareAndOpen = async () => {
			const refreshedToken = await refreshAccessToken();
			if (!refreshedToken) {
				const existingToken = await getValidAccessToken();
				if (!existingToken) {
					clearAccessToken();
					setIsAuthorized(false);
					router.replace("/blog");
					return;
				}
			}

			setEditingPostSlug(null);
			setModalTitle("");
			setModalContent("");
			setModalKeywords("");
			openModal();
		};

		void prepareAndOpen();
	};

	const openEditModal = (post: Post): void => {
		const prepareAndOpen = async () => {
			const refreshedToken = await refreshAccessToken();
			if (!refreshedToken) {
				const existingToken = await getValidAccessToken();
				if (!existingToken) {
					clearAccessToken();
					setIsAuthorized(false);
					router.replace("/blog");
					return;
				}
			}

			setEditingPostSlug(post.slug);
			setModalTitle(post.title);
			setModalContent(post.content);
			setModalKeywords(post.keywords || "");
			openModal();
		};

		void prepareAndOpen();
	};

	const handleDelete = async (slug: string): Promise<void> => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			let token = await getValidAccessToken();
			if (!token) {
				clearAccessToken();
				router.replace("/blog/admin");
				return;
			}

			let res = await fetch(blogApiUrl(slug), {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (res.status === 401) {
				token = await refreshAccessToken();
				if (!token) {
					clearAccessToken();
					router.replace("/blog/admin");
					return;
				}

				res = await fetch(blogApiUrl(slug), {
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` },
				});
			}

			if (res.ok) deletePost(slug);
		} catch (err) {
			console.error(err);
		}
	};

	if (isCheckingAuth) {
		return <p className="text-azb-3 text-center mt-10">Checking auth...</p>;
	}

	if (!isAuthorized) return <></>;

	return (
		<div className="max-w-4xl my-8 flex flex-col min-h-screen items-center mx-auto p-6 bg-azs-1 rounded-2xl shadow">
			<section className="flex items-center justify-between w-full mb-8">
				<h1 className="text-4xl font-bold text-azb-5">Manage Blog</h1>
				<button
					type="button"
					className="bg-azs-4 text-azb-1 px-4 py-2 rounded hover:bg-azs-5"
					onClick={openNewPostModal}
				>
					+ New Post
				</button>
			</section>

			{posts.length === 0 ? (
				<p className="text-xl tracking-wide text-azb-5">No posts yet.</p>
			) : (
				<div className="grid gap-8 w-full">
					{posts.map((post) => (
						<article
							key={post.slug}
							className="border border-azb-5 bg-azs-2 rounded-2xl shadow p-6 hover:shadow-lg transition"
						>
							<h2 className="text-2xl font-bold text-azb-4 mb-2">
								{post.title}
							</h2>
							<p className="text-sm text-azg-2">
								{new Date(post.created_at).toLocaleDateString()}
							</p>
							<div className="mt-4 flex gap-2">
								<button
									type="button"
									className="bg-azb-4 text-azs-1 px-3 py-1 rounded hover:bg-azb-5"
									onClick={() => openEditModal(post)}
								>
									Edit
								</button>
								<button
									type="button"
									className="bg-azb-3 text-azs-1 px-3 py-1 rounded hover:bg-azb-5"
									onClick={() => handleDelete(post.slug)}
								>
									Delete
								</button>
							</div>
						</article>
					))}
				</div>
			)}

			<BlogPostModal />
		</div>
	);
}
