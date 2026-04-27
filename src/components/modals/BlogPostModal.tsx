import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import type { FormEvent } from "react";
import { type Post, useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";
import { normalizeBlogContent } from "@/lib/blogContent";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function BlogPostModal(): JSX.Element {
	const {
		isOpen,
		closeModal,

		modalTitle,
		modalContent,
		modalKeywords,
		editingPostSlug,

		setModalTitle,
		setModalContent,
		setModalKeywords,

		addPost,
		updatePost,
		fetchWithAuth,
		clearAccessToken,
	} = useBlogStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const body = {
			title: modalTitle,
			content: normalizeBlogContent(modalContent),
			keywords: modalKeywords,
		};

		const url = editingPostSlug ? blogApiUrl(editingPostSlug) : blogApiUrl("/");
		const method: "POST" | "PUT" = editingPostSlug ? "PUT" : "POST";

		try {
			const res = await fetchWithAuth(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!res) {
				clearAccessToken();
				alert("Session expired. Please log in again.");
				return;
			}

			if (!res.ok) {
				const errData = await res.json();
				console.error("API error:", errData);
				return;
			}

			const data = await res.json();
			const post: Post = data.post; // backend returns { post: {...} }

			editingPostSlug ? updatePost(post) : addPost(post);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={(o) => !o && closeModal()}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
				<Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-white/25 bg-azb-5/90 p-6 text-azs-1 shadow-2xl shadow-black/40 backdrop-blur-xl">
					<Dialog.Title className="mb-4 text-center text-lg font-bold text-azg-2">
						{editingPostSlug ? "Edit Post" : "New Post"}
					</Dialog.Title>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
						<input
							type="text"
							placeholder="Title"
							className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 font-bold text-azs-1 placeholder:text-azs-4"
							value={modalTitle}
							onChange={(e) => setModalTitle(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="Keywords (comma-separated)"
							className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-azs-1 placeholder:text-azs-4"
							value={modalKeywords}
							onChange={(e) => setModalKeywords(e.target.value)}
						/>
						<div className="max-h-96 overflow-y-auto rounded-md border border-white/20 bg-azs-1">
							<div data-color-mode="light">
								<MDEditor
									value={modalContent}
									onChange={(value: string | undefined) =>
										setModalContent(value ?? "")
									}
									height={320}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="w-full rounded-md bg-azg-2 px-4 py-2 font-bold tracking-wider text-azb-5 hover:bg-azs-1"
						>
							{editingPostSlug ? "Save Changes" : "Create Post"}
						</button>
					</form>

					<Dialog.Close asChild>
						<button type="button" className="absolute right-2 top-2 text-azb-3">
							✕
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
