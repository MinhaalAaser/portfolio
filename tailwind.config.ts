import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				md: "2px 2px 4px var(--tw-shadow-color)",
				lg: "4px 4px 8px var(--tw-shadow-color)",
			},
		},
		colors: {
			transparent: "transparent",
			white: "#f2ebfb",
			gray: "#e2dada",
			black: "#02010a",
			azp: {
				1: "#9d4edd",
				2: "#7b2cbf",
				3: "#5a189a",
				4: "#3c096c",
				5: "#240046",
			},
			azo: {
				1: "#ff9e00",
				2: "#ff9100",
				3: "#ff8500",
				4: "#ff7900",
				5: "#ff6d00",
			},
			azg: {
				1: "#D4AF37",
				2: "#FFD700",
			},
			azs: {
				1: "#f5f5f5",
				2: "#e0e0e0",
				3: "#c0c0c0",
				4: "#9a9a9a",
				5: "#707070",
			},
			azb: {
				1: "#3c8dc5",
				2: "#116ca5",
				3: "#105585",
				4: "#0b4472",
				5: "#001c32",
			},
		},
	},
	plugins: [
		plugin(({ addUtilities, theme }) => {
			const shadows = theme("textShadow") as Record<string, string>;

			const newUtilities = Object.fromEntries(
				Object.entries(shadows).map(([key, value]) => [
					`.text-shadow${key === "DEFAULT" ? "" : `-${key}`}`,
					{ textShadow: value },
				]),
			);

			interface CustomAddUtilitiesOptions
				extends Partial<{ respectPrefix: boolean; respectImportant: boolean }> {
				responsive?: boolean;
				hover?: boolean;
			}

			addUtilities(newUtilities, {
				responsive: true,
				hover: true,
			} as CustomAddUtilitiesOptions);
		}),
	],
};
export default config;
