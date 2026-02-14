import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeBlogContent } from "@/lib/blogContent";

const markdownComponents: Components = {
	h1: ({ node, ...props }) => (
		<h1 className="text-3xl font-bold text-azb-5 mt-6 mb-3" {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2 className="text-2xl font-bold text-azb-5 mt-5 mb-3" {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className="text-xl font-semibold text-azb-5 mt-4 mb-2" {...props} />
	),
	p: ({ node, ...props }) => (
		<p className="text-azb-4 leading-relaxed mb-3" {...props} />
	),
	ul: ({ node, ...props }) => (
		<ul className="list-disc pl-6 text-azb-4 mb-3 space-y-1" {...props} />
	),
	ol: ({ node, ...props }) => (
		<ol className="list-decimal pl-6 text-azb-4 mb-3 space-y-1" {...props} />
	),
	li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="border-l-4 border-azb-2 bg-azs-2/60 px-4 py-2 italic text-azb-4 my-4"
			{...props}
		/>
	),
	a: ({ node, ...props }) => (
		<a className="text-azb-3 underline underline-offset-2" {...props} />
	),
	code: ({ node, className, ...props }) => (
		<code
			className={`rounded bg-azs-1 px-1.5 py-0.5 text-azb-5 ${
				className ?? ""
			}`.trim()}
			{...props}
		/>
	),
	pre: ({ node, ...props }) => (
		<pre
			className="overflow-x-auto rounded-lg bg-azb-5 p-4 text-azs-1 my-4"
			{...props}
		/>
	),
	hr: ({ node, ...props }) => <hr className="border-azs-5 my-6" {...props} />,
};

interface BlogMarkdownProps {
	content: string;
}

export default function BlogMarkdown({ content }: BlogMarkdownProps): JSX.Element {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={markdownComponents}
		>
			{normalizeBlogContent(content)}
		</ReactMarkdown>
	);
}
