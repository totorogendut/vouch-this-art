import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";
import { manifest } from "./src/manifest";
import { globSync } from "node:fs";
import type { Plugin } from "vite";

export default (): Plugin => {
	return {
		name: "manifest-file",
		apply: "build", // Apply only during build
		async writeBundle() {
			const filePath = resolve(__dirname, "build", "manifest.json");
			const assets = globSync("./build/assets/**/*").map((str) =>
				str.replace("build/", ""),
			);
			const resources = manifest.web_accessible_resources[0].resources;
			resources.push(...assets);

			// Write the file to the 'dist' directory
			await writeFile(filePath, JSON.stringify(manifest, null, 2), "utf-8");
		},
	};
};
