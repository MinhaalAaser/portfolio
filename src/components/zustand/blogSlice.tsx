import { create } from "zustand";
import { blogApiUrl } from "@/lib/blogApi";

export interface Post {
	id?: number;
	slug: string;
	title: string;
	content: string;
	keywords?: string;
	created_at: string;
}

interface BlogState {
	// Posts
	posts: Post[];
	hasLoaded: boolean;
	fetchPosts: (force?: boolean) => Promise<void>;

	setPosts: (posts: Post[]) => void;
	addPost: (post: Post) => void;
	updatePost: (post: Post) => void;
	deletePost: (slug: string) => void;

	// Modal state
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;

	// Auth modal state
	authIsOpen: boolean;
	openAuthModal: () => void;
	closeAuthModal: () => void;
	toggleAuthModal: () => void;
	setAccessToken: (token: string) => void;
	clearAccessToken: () => void;
	isManager: boolean;
	syncAccessToken: () => void;
	getAccessToken: () => string | null;
	refreshAccessToken: () => Promise<string | null>;
	getValidAccessToken: () => Promise<string | null>;
	fetchWithAuth: (
		input: RequestInfo | URL,
		init?: RequestInit,
	) => Promise<Response | null>;

	// Modal fields
	modalTitle: string;
	modalContent: string;
	modalKeywords: string;
	editingPostSlug: string | null;

	// Modal field setters
	setModalTitle: (title: string) => void;
	setModalContent: (content: string) => void;
	setModalKeywords: (keywords: string) => void;
	setEditingPostSlug: (slug: string | null) => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
	// Posts
	posts: [],
	hasLoaded: false,

	async fetchPosts(force = false) {
		// Prevent duplicate fetches
		if (!force && get().hasLoaded) return;

		try {
			const res = await fetch(blogApiUrl("/"), {
				credentials: "include",
				cache: "no-store",
			});

			if (!res.ok) return;

			const data: Post[] = await res.json();
			set({ posts: data, hasLoaded: true });
		} catch (err) {
			console.error(err);
		}
	},

	setPosts: (posts) => set({ posts, hasLoaded: true }),
	addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
	updatePost: (post) =>
		set((state) => ({
			posts: state.posts.map((p) => (p.slug === post.slug ? post : p)),
		})),
	deletePost: (slug) =>
		set((state) => ({
			posts: state.posts.filter((p) => p.slug !== slug),
		})),

	// Modal visibility
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
	toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),

	// Auth modal visibility
	authIsOpen: false,
	openAuthModal: () => set({ authIsOpen: true }),
	closeAuthModal: () => set({ authIsOpen: false }),
	toggleAuthModal: () => set((state) => ({ authIsOpen: !state.authIsOpen })),
	isManager: false,
	setAccessToken: (token) => {
		if (typeof window === "undefined") return;
		localStorage.setItem("access_token", token);
		set({ isManager: true });
	},
	clearAccessToken: () => {
		if (typeof window === "undefined") return;
		localStorage.removeItem("access_token");
		set({ isManager: false });
	},
	syncAccessToken: () => {
		if (typeof window === "undefined") return;
		const token = localStorage.getItem("access_token");
		set({ isManager: Boolean(token) });
	},
	getAccessToken: () => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("access_token");
	},
	refreshAccessToken: async () => {
		try {
			const res = await fetch(blogApiUrl("auth/refresh"), {
				method: "POST",
				credentials: "include",
			});

			if (!res.ok) {
				get().clearAccessToken();
				return null;
			}

			const data = await res.json();
			const token =
				typeof data?.access_token === "string" ? data.access_token : null;

			if (token) {
				get().setAccessToken(token);
				return token;
			}
		} catch (err) {
			console.error(err);
		}

		get().clearAccessToken();
		return null;
	},
	getValidAccessToken: async () => {
		const existingToken = get().getAccessToken();
		if (existingToken) return existingToken;
		return get().refreshAccessToken();
	},
	fetchWithAuth: async (input, init = {}) => {
		let token = await get().getValidAccessToken();
		if (!token) return null;

		let res = await fetch(input, {
			...init,
			headers: {
				...(init.headers ?? {}),
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status !== 401) return res;

		token = await get().refreshAccessToken();
		if (!token) return null;

		res = await fetch(input, {
			...init,
			headers: {
				...(init.headers ?? {}),
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	},

	// Modal fields
	modalTitle: "",
	modalContent: "",
	modalKeywords: "",
	editingPostSlug: null,

	// Modal field setters
	setModalTitle: (modalTitle) => set({ modalTitle }),
	setModalContent: (modalContent) => set({ modalContent }),
	setModalKeywords: (modalKeywords) => set({ modalKeywords }),
	setEditingPostSlug: (editingPostSlug) => set({ editingPostSlug }),
}));
