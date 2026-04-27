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
				router.push("/blog");
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
				<Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
				<Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/25 bg-azb-5/90 p-6 text-azs-1 shadow-2xl shadow-black/40 backdrop-blur-xl">
					<Dialog.Title className="mb-4 text-lg font-bold text-azg-2">
						Login
					</Dialog.Title>

					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							placeholder="Email"
							className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-azs-1 placeholder:text-azs-4"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							placeholder="Password"
							className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-azs-1 placeholder:text-azs-4"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button
							type="submit"
							className="w-full rounded-md bg-azg-2 px-4 py-2 font-bold text-azb-5 hover:bg-azs-1"
						>
							Sign In
						</button>
					</form>

					<Dialog.Close asChild>
						<button type="button" className="absolute right-2 top-2 text-azg-2">
							✕
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
