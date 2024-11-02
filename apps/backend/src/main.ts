import { app } from "../_shared";

app.get("/", async (c) => {
	return c.text("Hello world!", 200);
});
