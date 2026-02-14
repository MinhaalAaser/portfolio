const collapseSpacing = (value: string): string =>
	value
		.replace(/\r\n/g, "\n")
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();

export const normalizeBlogContent = (value: string): string => {
	if (!value) return "";

	return collapseSpacing(
		value
			.replace(/\\r\\n/g, "\n")
			.replace(/\\n/g, "\n")
			.replace(/\/(?=#{1,6}\s)/g, "\n"),
	);
};

export const blogExcerpt = (value: string, maxLength = 160): string => {
	const normalized = normalizeBlogContent(value);

	const plain = normalized
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/!\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
		.replace(/^\s{0,3}(#{1,6}\s+|>\s+|[-*+]\s+|\d+\.\s+)/gm, "")
		.replace(/[*_~]/g, "")
		.replace(/\n+/g, " ")
		.replace(/\s{2,}/g, " ")
		.trim();

	return plain.length > maxLength ? `${plain.slice(0, maxLength)}...` : plain;
};

export const blogPreview = (value: string, maxLength = 160): string =>
	blogExcerpt(value, maxLength);
