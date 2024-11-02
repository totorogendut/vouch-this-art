const scriptElem = document.createElement("script");
scriptElem.src = chrome.runtime.getURL("/assets/content-esm.js");
scriptElem.type = "module";
scriptElem.defer = true;
document.head.appendChild(scriptElem);

const font1 = new FontFace(
	"vollkorn",
	`url(${chrome.runtime.getURL("/assets/fonts/Vollkorn-VariableFont_wght.ttf")})`,
);
document.fonts.add(font1);
font1.load();

const font2 = new FontFace(
	"manrope",
	`url(${chrome.runtime.getURL("/assets/fonts/Manrope-VariableFont_wght.ttf")})`,
);
document.fonts.add(font2);
font2.load();
