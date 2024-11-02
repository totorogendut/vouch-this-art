import { cors } from "hono/cors";
import { app } from "./_shared";
import "./src/main";
import "./src/lists";
import "./src/upload";
import "./src/verify-vouch";

const port = Number.parseInt(process.env.PORT || "3000");
console.log(`Running at http://localhost:${port}`);

app.options("*", (c) => {
	return c.text("", 204);
});

export default {
	port,
	fetch: app.fetch,
};
