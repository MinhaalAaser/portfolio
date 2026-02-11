import * as Dialog from "@radix-ui/react-dialog";
import type { FormEvent } from "react";
import RichMarkdownEditor from "@/components/RichMDEditor";
import { type Post, useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";

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
	} = useBlogStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const token = localStorage.getItem("access_token"); // get JWT
		if (!token) {
			alert("You must be logged in to perform this action.");
			return;
		}

		const body = {
			title: modalTitle,
			content: modalContent,
			keywords: modalKeywords,
		};

		const url = editingPostSlug ? blogApiUrl(editingPostSlug) : blogApiUrl("/");
		const method: "POST" | "PUT" = editingPostSlug ? "PUT" : "POST";

		try {
			const res = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // attach JWT
				},
				body: JSON.stringify(body),
			});

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
				<Dialog.Overlay className="fixed inset-0 bg-black/50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-azs-2 p-6 shadow-lg overflow-y-auto">
					<Dialog.Title className="mb-4 text-lg text-center font-medium text-azb-4">
						{editingPostSlug ? "Edit Post" : "New Post"}
					</Dialog.Title>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
						<input
							type="text"
							placeholder="Title"
							className="w-full rounded border px-3 py-2 bg-azs-1 text-azb-5 font-bold"
							value={modalTitle}
							onChange={(e) => setModalTitle(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="Keywords (comma-separated)"
							className="w-full rounded border px-3 py-2 bg-azs-1 text-azb-4"
							value={modalKeywords}
							onChange={(e) => setModalKeywords(e.target.value)}
						/>
						<div className="max-h-96 overflow-y-auto border rounded bg-azs-1">
							<RichMarkdownEditor
								value={modalContent}
								onChange={setModalContent}
							/>
						</div>
						<button
							type="submit"
							className="bg-azb-5 text-azs-1 tracking-wider px-4 py-2 rounded w-full hover:bg-azb-4"
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
