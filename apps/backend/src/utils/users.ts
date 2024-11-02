import type { User } from "../../app";
import { verifyCredential } from "./vidos";

export async function verifyUserCredential(user: User): Promise<{
	ok: boolean;
	message: string;
}> {
	const { issuer, validUntil, validFrom } = user;
	if (!issuer) return { ok: false, message: "" };
	try {
		const now = Date.now();
		const from = new Date(validFrom).getTime();
		const until = new Date(validUntil || Date.now()).getTime();

		if (validFrom && now < from)
			return { ok: false, message: "user credential has not been valid yet" };

		if (validUntil && now > until)
			return { ok: false, message: "user credential has been expired" };
	} catch (error) {
		return {
			ok: false,
			message: "something is wrong when parsing validation date",
		};
	}

	// TODO - check against issuers' server if required
	const verified = await verifyCredential(user);

	if (!verified)
		return { ok: false, message: "credential document verify invalid" };

	return { ok: true, message: "user is valid" };
}
