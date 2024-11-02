import "./content-esm";
import "./content.css";

const font1 = new FontFace(
	"vollkorn",
	`url(${"/assets/fonts/Vollkorn-VariableFont_wght.ttf"})`,
);
document.fonts.add(font1);
font1.load();

const font2 = new FontFace(
	"manrope",
	`url(${"/assets/fonts/Manrope-VariableFont_wght.ttf"})`,
);
document.fonts.add(font2);
font2.load();
