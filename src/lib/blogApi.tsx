const FIXED_BLOG_API_BASE = "https://api.aaserzypher.dev/blog";

const normalizeBase = (url: string): string => url.replace(/\/+$/, "");

export const BLOG_API_BASE = normalizeBase(FIXED_BLOG_API_BASE);

export const BLOG_API_ORIGIN = new URL(BLOG_API_BASE).origin;

export const blogApiUrl = (path = ""): string => {
	if (!path) return BLOG_API_BASE;
	return `${BLOG_API_BASE}/${path.replace(/^\/+/, "")}`;
};
