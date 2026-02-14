import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Post, useBlogStore } from "@/components/zustand/blogSlice";
import { normalizeBlogContent } from "@/lib/blogContent";
import { blogApiUrl } from "@/lib/blogApi";

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
				const res = await fetch(
					blogApiUrl(encodeURIComponent(slugValue)),
					{
						cache: "no-store",
					},
				);
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
		return <p className="text-azb-3 text-center mt-10">Loading...</p>;
	if (!post)
		return <p className="text-azg-2 text-center mt-10">Post not found.</p>;

	return (
		<article className="max-w-3xl mx-auto bg-azs-3 px-4 rounded-2xl py-6 text-left mb-8 p-6 flex flex-col gap-4">
			<h1 className="text-4xl font-bold text-azb-5">{post.title}</h1>

			<p className="text-md text-azg-2 text-shadow-md shadow-azb-5">
				Created on {new Date(post.created_at).toLocaleDateString()}
			</p>

			{post.keywords && (
				<p className="text-sm bg-azs-1 px-2 py-1 rounded-md text-azb-5">
					Keywords: {post.keywords}
				</p>
			)}

			<div className="prose prose-azb max-w-full text-azb-4">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
			</div>
		</article>
	);
}
