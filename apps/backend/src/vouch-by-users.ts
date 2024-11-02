import { ctxSetup, PinataLimiter } from "../_shared";
import { app } from "../_shared";

// TODO
app.get("/user/:id", async (c) => {
	const userId: string = c.req.param("id");
	const limit: number = Number.parseInt(c.req.query("limit") || "100");
	if (!userId) return c.json({ message: "user id is not defined" }, 400);
	const { pinata } = ctxSetup(c);

	const result = await PinataLimiter.wrap(() =>
		pinata.files.list().metadata({ userId }).limit(limit).order("DESC"),
	)();

	return c.json(result.files, 200);
});
