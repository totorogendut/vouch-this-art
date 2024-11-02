export function isElementHidden(element: HTMLElement): boolean {
	// Check if display is 'none'
	const isDisplayNone = window.getComputedStyle(element).display === "none";
	// Check if visibility is 'hidden' or 'collapse'
	const isVisibilityHidden =
		window.getComputedStyle(element).visibility === "hidden" ||
		window.getComputedStyle(element).visibility === "collapse";
	// Check if opacity is 0
	const isOpacityZero = window.getComputedStyle(element).opacity === "0";
	// Check if the element or any of its ancestors have display:none
	const isAncestorDisplayNone = element.offsetParent === null;

	return (
		isDisplayNone ||
		isVisibilityHidden ||
		isOpacityZero ||
		isAncestorDisplayNone ||
		!element.isConnected
	);
}
