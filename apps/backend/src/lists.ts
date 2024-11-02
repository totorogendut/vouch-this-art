import chalk from "chalk";
import { ctxSetup, PinataLimiter } from "../_shared";
import { app } from "../_shared";

app.get("/vouch-list/:hash", async (c) => {
	const imgHash = c.req.param("hash");
	console.log(chalk.bgBlue.bold(" LIST "), imgHash);
	const limit: number = Number.parseInt(c.req.query("limit") || "100");
	if (!imgHash) return c.json({ message: "image hash not defined" }, 400);
	const { pinata } = ctxSetup(c);

	try {
		const result = await PinataLimiter.wrap(() =>
			pinata.files
				.list()
				.metadata({ hash: imgHash })
				.limit(limit)
				.order("DESC"),
		)();

		return c.json(result.files);
	} catch (error) {
		console.error(error);
		return c.text("something wrong", 500);
	}
});
