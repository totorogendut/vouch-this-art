import chalk from "chalk";
import { ctxSetup, PinataLimiter, VERIFY_CREDENTIAL } from "../_shared";
import { app } from "../_shared";
import type { UserCredential, VouchListItemKeyValue } from "../app";
import { verifyUserCredential } from "./utils/users";

export interface VouchUploadRequest {
	imgHash: string;
	reqId: string;
	userCredential: UserCredential;
	message?: string;
	imgUrl?: string;
}

export interface VouchUploadJSONBody {
	imgHash: string;
	userId: string;
	userCredential: UserCredential;
	message: string;
}

app.post("/vouch", async (c) => {
	const { pinata } = ctxSetup(c);
	const {
		imgHash,
		reqId,
		userCredential,
		message,
		imgUrl,
	}: VouchUploadRequest = (await c.req.json()) || {};

	console.log(
		chalk.bgGreen.bold(" UPLOAD "),
		imgHash,
		"by",
		userCredential?.credentialSubject?.username,
	);

	if (Array.isArray(userCredential.credentialSubject))
		return c.text("currently only one credential subject supported", 500);
	if (!userCredential?.credentialSubject?.id)
		return c.text("no suitable credential subject detected", 500);
	if (!userCredential?.credentialSubject?.username)
		return c.text("credential subject incomplete - no username given", 500);

	if (VERIFY_CREDENTIAL) {
		const { ok, message: verifyMessage } =
			await verifyUserCredential(userCredential);
		if (!ok) return c.text(verifyMessage, 500);
	}

	const userId = userCredential.credentialSubject.id;
	const name = `vouch-${reqId}.json`;

	const keyvalues: VouchListItemKeyValue = {
		hash: imgHash,
		userId,
		username: userCredential.credentialSubject.username,
		// user: user.credentialSubject,
	};

	if (message) keyvalues.message = message;
	if (userCredential.credentialSubject?.email)
		keyvalues.email = userCredential.credentialSubject.email;
	if (imgUrl && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(imgUrl))
		keyvalues.imgUrl = imgUrl;

	try {
		const upload = await PinataLimiter.wrap(() =>
			pinata.upload
				.json({
					imgHash,
					userId,
					userCredential,
					message: message || "",
				} satisfies VouchUploadJSONBody)
				.addMetadata({
					name,
					keyvalues,
				}),
		)();

		return c.json(upload);
	} catch (error) {
		console.error(chalk.bgRed.bold(" ERROR "), error);
		return c.json({ message: "error uploading file", error }, 500);
	}
});
