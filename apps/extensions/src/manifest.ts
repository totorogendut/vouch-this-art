export const manifest = {
	manifest_version: 3,
	version: "1.0.0",
	name: "__MSG_APPNAME__",
	description: "__MSG_APPDESC__",
	default_locale: "en",
	icons: {
		"16": "icons/icon16.png",
		"48": "icons/icon48.png",
		"128": "icons/icon128.png",
	},
	action: {},
	background: {
		service_worker: "assets/background.js",
	},
	content_scripts: [
		{
			matches: ["https://*/*"],
			js: ["assets/content.js"],
			css: ["assets/content.css"],
			run_at: "document_idle",
		},
	],
	permissions: ["contextMenus"],
	host_permissions: ["https://*/*"],
	web_accessible_resources: [
		{
			resources: ["index.html"],
			matches: ["https://*/*"],
		},
	],
};
