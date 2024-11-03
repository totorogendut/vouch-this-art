import "dotenv/config";
import type { UserCredential } from "../../../app";

interface VerifyResult {
	checks: string[];
	warnings?: string[];
	errors?: string[];
	credential: UserCredential;
}

export async function verifyCredentialWithVidos(
	subject: UserCredential,
): Promise<boolean> {
	const res = await fetch(
		`https://${import.meta.env.VIDOS_VERIFIER_ENDPOINT}/w3c-ccg/vc-api/v0.0.3/credentials/verify`,
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VIDOS_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ verifiableCredential: subject }),
		},
	);

	if (!res.ok) throw "verify failed";
	const data: VerifyResult = await res.json();

	return !data.errors?.length;
}
