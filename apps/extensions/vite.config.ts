import { sveltekit } from "@sveltejs/kit/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";
import { resolve } from "node:path";
import manifest from "./create-manifest";

export default defineConfig({
	plugins: [
		svelte(),
		// tailwind()
		manifest(),
	],

	build: {
		cssTarget: "chrome111",
		outDir: "build",

		rollupOptions: {
			input: [
				"src/content.ts",
				"src/content.css",
				"src/content-esm.ts",
				"src/background.ts",
			],
			output: {
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/[name].[ext]",
				// format: "iife",
			},
		},
	},
	publicDir: "static",
	resolve: {
		alias: {
			$lib: resolve(__dirname, "src/lib"),
		},
	},
});
