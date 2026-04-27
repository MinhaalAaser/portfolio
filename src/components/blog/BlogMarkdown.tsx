import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeBlogContent } from "@/lib/blogContent";

const markdownComponents: Components = {
	h1: ({ node, ...props }) => (
		<h1 className="mb-3 mt-6 text-3xl font-bold text-azg-2" {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2 className="mb-3 mt-5 text-2xl font-bold text-azg-2" {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className="mb-2 mt-4 text-xl font-semibold text-azs-1" {...props} />
	),
	p: ({ node, ...props }) => (
		<p className="mb-4 leading-8 text-azs-2" {...props} />
	),
	ul: ({ node, ...props }) => (
		<ul className="mb-4 list-disc space-y-2 pl-6 text-azs-2" {...props} />
	),
	ol: ({ node, ...props }) => (
		<ol className="mb-4 list-decimal space-y-2 pl-6 text-azs-2" {...props} />
	),
	li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="my-5 border-l-4 border-azg-2 bg-white/10 px-4 py-3 italic text-azs-2"
			{...props}
		/>
	),
	a: ({ node, ...props }) => (
		<a
			className="font-bold text-azg-2 underline underline-offset-4"
			{...props}
		/>
	),
	code: ({ node, className, ...props }) => (
		<code
			className={`rounded bg-white/10 px-1.5 py-0.5 text-azg-2 ${
				className ?? ""
			}`.trim()}
			{...props}
		/>
	),
	pre: ({ node, ...props }) => (
		<pre
			className="my-5 overflow-x-auto rounded-lg border border-white/15 bg-black/40 p-4 text-azs-1"
			{...props}
		/>
	),
	hr: ({ node, ...props }) => (
		<hr className="my-6 border-white/20" {...props} />
	),
};

interface BlogMarkdownProps {
	content: string;
}

export default function BlogMarkdown({
	content,
}: BlogMarkdownProps): JSX.Element {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
			{normalizeBlogContent(content)}
		</ReactMarkdown>
	);
}
