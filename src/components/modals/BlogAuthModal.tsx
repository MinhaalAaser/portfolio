import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { useBlogStore } from "@/components/zustand/blogSlice";
import { blogApiUrl } from "@/lib/blogApi";

export default function BlogAuthModal() {
	const { authIsOpen, closeAuthModal, setAccessToken, refreshAccessToken } =
		useBlogStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(blogApiUrl("auth/login"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password }),
			});

			if (res.ok) {
				const data = await res.json();
				if (typeof data?.access_token === "string") {
					setAccessToken(data.access_token);
				} else {
					await refreshAccessToken();
				}
				closeAuthModal();
				router.push("/blog/admin");
			} else {
				console.error("Login failed");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Dialog.Root open={authIsOpen} onOpenChange={(o) => !o && closeAuthModal()}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50" />
				<Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
					<Dialog.Title className="mb-4 text-lg font-medium">
						Login
					</Dialog.Title>

					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							placeholder="Email"
							className="w-full rounded border px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							placeholder="Password"
							className="w-full rounded border px-3 py-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button type="submit" className="w-full">
							Sign In
						</button>
					</form>

					<Dialog.Close asChild>
						<button type="button" className="absolute right-2 top-2">
							✕
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
