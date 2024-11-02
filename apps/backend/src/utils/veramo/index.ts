import type { CredentialSubject } from "@veramo/core";
import { agent } from "./setup";

export async function listManagers() {
	return await agent.didManagerFind();
}

export async function createManager(alias = "default") {
	return await agent.didManagerCreate({ alias });
}

export async function createCredential(
	managerAlias: string,
	subject: CredentialSubject | Array<CredentialSubject>,
) {
	const managerIdentifier = await agent.didManagerGetByAlias({
		alias: managerAlias,
	});
	if (!managerIdentifier) throw new Error("did manager not found");

	return await agent.createVerifiableCredential({
		credential: {
			issuer: { id: managerIdentifier.did },
			credentialSubject: subject,
		},
		proofFormat: "jwt",
	});
}
