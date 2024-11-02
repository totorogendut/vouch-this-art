import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	compilerOptions:{
		customElement:true
	},

	// kit: {
	// 	// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
	// 	// If your environment is not supported or you settled on a specific environment, switch out the adapter.
	// 	// See https://kit.svelte.dev/docs/adapters for more information about adapters.
	// 	adapter: adapter(),
	// 	appDir: "app",
	// 	alias: {
	// 		$consts: "src/consts.ts",
	// 	},
	// },
	onwarn(warning, handler) {
		if (warning.message.includes('A11y')) return;
		!warning.message.includes('chrome') && handler(warning);
	},
	extensions: [".svelte", ".mdx"],
};
export default config;