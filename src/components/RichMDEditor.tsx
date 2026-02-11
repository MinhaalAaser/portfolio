// components/RichMarkdownEditor.tsx
import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	codeBlockPlugin,
	headingsPlugin,
	InsertCodeBlock,
	ListsToggle,
	linkPlugin,
	listsPlugin,
	MDXEditor,
	markdownShortcutPlugin,
	quotePlugin,
	toolbarPlugin,
} from "@mdxeditor/editor";

interface Props {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

function looksLikeHtml(input: string): boolean {
	return /<\/?[a-z][\s\S]*>/i.test(input.trim());
}

function normalizeMarkdownSpacing(markdown: string): string {
	return markdown
		.replace(/\r\n/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

function htmlNodeToMarkdown(node: Node): string {
	if (node.nodeType === Node.TEXT_NODE) {
		return node.textContent ?? "";
	}

	if (node.nodeType !== Node.ELEMENT_NODE) return "";

	const el = node as HTMLElement;
	const tag = el.tagName.toLowerCase();
	const children = Array.from(el.childNodes).map(htmlNodeToMarkdown).join("");

	switch (tag) {
		case "br":
			return "\n";
		case "p":
			return `${children}\n\n`;
		case "strong":
		case "b":
			return `**${children}**`;
		case "em":
		case "i":
			return `*${children}*`;
		case "u":
			// Markdown has no native underline; keep plain text.
			return children;
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6": {
			const depth = Number(tag[1]);
			return `${"#".repeat(depth)} ${children}\n\n`;
		}
		case "code":
			return `\`${children}\``;
		case "pre":
			return `\`\`\`\n${el.textContent ?? ""}\n\`\`\`\n\n`;
		case "a": {
			const href = el.getAttribute("href") ?? "";
			return href ? `[${children}](${href})` : children;
		}
		case "blockquote": {
			const lines = children.split("\n").filter((line) => line.length > 0);
			return `${lines.map((line) => `> ${line}`).join("\n")}\n\n`;
		}
		case "ul": {
			const items = Array.from(el.children)
				.filter((child) => child.tagName.toLowerCase() === "li")
				.map((child) => `- ${htmlNodeToMarkdown(child).trim()}`)
				.join("\n");
			return `${items}\n\n`;
		}
		case "ol": {
			const items = Array.from(el.children)
				.filter((child) => child.tagName.toLowerCase() === "li")
				.map((child, idx) => `${idx + 1}. ${htmlNodeToMarkdown(child).trim()}`)
				.join("\n");
			return `${items}\n\n`;
		}
		case "li":
			return children;
		default:
			return children;
	}
}

function htmlToMarkdown(html: string): string {
	if (typeof window === "undefined") return html;
	const parser = new window.DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const markdown = Array.from(doc.body.childNodes).map(htmlNodeToMarkdown).join("");
	return normalizeMarkdownSpacing(markdown);
}

function normalizeEditorOutput(content: string): string {
	if (!content) return "";
	if (!looksLikeHtml(content)) return normalizeMarkdownSpacing(content);
	return htmlToMarkdown(content);
}

export default function RichMarkdownEditor({
	value,
	onChange,
	className,
}: Props) {
	return (
		<MDXEditor
			markdown={value}
			onChange={(nextValue) => onChange(normalizeEditorOutput(nextValue))}
			className={`w-full rounded border px-3 py-2 bg-azs-1 text-azb-4 placeholder:text-azs-4 h-60 ${className}`}
			plugins={[
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<BoldItalicUnderlineToggles />
							<BlockTypeSelect />
							<ListsToggle />
							<CreateLink />
							<InsertCodeBlock />
						</>
					),
				}),
				headingsPlugin(),
				listsPlugin(),
				linkPlugin(),
				quotePlugin(),
				codeBlockPlugin(),
				markdownShortcutPlugin(),
			]}
		/>
	);
}
