import chalk from "chalk";
import { app, ctxSetup, PinataLimiter } from "../_shared";
import type { VouchUploadJSONBody } from "./upload";
import { verifyUserCredential } from "./utils/users";

interface VouchJSONData extends JSON, VouchUploadJSONBody {}

app.get("/verify-vouch/:cid", async (c) => {
	const { pinata } = ctxSetup(c);
	const { cid } = c.req.param();

	console.log(chalk.bgMagenta.bold(" VERIFYING "), cid);

	try {
		const { data } = await PinataLimiter.wrap(() => pinata.gateways.get(cid))();
		if (!("userCredential" in (data as VouchJSONData)))
			return c.text("wrong format", 504);

		const { userCredential } = data as VouchJSONData;

		const { ok, message } = await verifyUserCredential(userCredential);
		if (ok) return c.text("verify success", 200);
		return c.text(`verify failed: ${message}`, 503);
	} catch (error) {
		return c.text(`something wrong: ${error}`, 500);
	}
});
