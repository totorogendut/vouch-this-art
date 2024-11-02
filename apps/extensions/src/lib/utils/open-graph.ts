export type OpenGraphProperty =
	| "title"
	| "description"
	| "image"
	| "url"
	| "type"
	| "site_name"
	| "locale"
	| "audio"
	| "video";

export type OpenGraphResult = Partial<
	Record<OpenGraphProperty, string | any[]>
>;

export function getOpenGraphMetaValue(
	property: OpenGraphProperty,
): string | null {
	return document
		.querySelector(`meta[property='og:${property}']`)
		?.getAttribute?.("content");
}

export function parseOpenGraphMeta(): OpenGraphResult {
	const metaTags = document.querySelectorAll('meta[property^="og:"]'); // Select all meta tags with property starting with "og:"
	const ogData: OpenGraphResult = {}; // Object to store Open Graph data

	for (const tag of metaTags) {
		const property = tag.getAttribute("property");
		const content = tag.getAttribute("content");

		// Split the property to handle structured properties (like og:image:width)
		const propertyParts = property.split(":");
		const rootProperty = propertyParts[1]; // Get the main property, e.g., 'image'

		// If it's a root property (like og:image), initialize or add to its array
		if (propertyParts.length === 2) {
			if (!ogData[rootProperty]) {
				ogData[rootProperty] = [];
			}
			ogData[rootProperty].push({ url: content });
		}
		// If it's a structured property (like og:image:width), add it to the last item
		else if (propertyParts.length === 3) {
			const subProperty = propertyParts[2];
			const lastItem = ogData[rootProperty][ogData[rootProperty].length - 1];
			lastItem[subProperty] =
				subProperty === "width" || subProperty === "height"
					? Number.parseInt(content) || 0
					: content;
		}
	}

	return ogData;
}
