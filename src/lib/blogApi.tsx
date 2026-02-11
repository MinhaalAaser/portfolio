const DEV_BASE = "http://192.168.0.181:5002";
const PROD_BASE = "https://api.aaserzypher.dev/blog";

const normalizeBase = (url: string): string => url.replace(/\/+$/, "");

const envBase =
	typeof process.env.NEXT_PUBLIC_BLOG_API_BASE === "string"
		? process.env.NEXT_PUBLIC_BLOG_API_BASE.trim()
		: "";

export const BLOG_API_BASE = normalizeBase(
	envBase || (process.env.NODE_ENV === "development" ? DEV_BASE : PROD_BASE),
);

export const BLOG_API_ORIGIN = new URL(BLOG_API_BASE).origin;

export const blogApiUrl = (path = ""): string => {
	if (!path) return BLOG_API_BASE;
	return `${BLOG_API_BASE}/${path.replace(/^\/+/, "")}`;
};
