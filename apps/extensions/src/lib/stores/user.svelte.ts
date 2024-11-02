import type { UserCredential } from "backend/app";
import { sha256 } from "js-sha256";
import { minidenticon } from "minidenticons";

class UserSubject {
	data: UserCredential = $state(null);
	isLoggedin: boolean = $derived(Boolean(this.data?.credentialSubject?.id));
	username: string = $derived(this.data?.credentialSubject?.username || "");
	avatar: string = $derived.by(() => {
		const email = this.data?.credentialSubject?.email;
		const userId = this.data?.credentialSubject?.id;

		if (email) return `https://gravatar.com/avatar/${sha256(email)}`;
		return minidenticon(userId);
	});

	async login(e?: Event) {
		e?.preventDefault?.();

		// demo
		this.data = {
			"@context": [
				"https://www.w3.org/ns/credentials/v2",
				"https://www.w3.org/ns/credentials/examples/v2",
			],
			id: "12345",
			type: ["VerifiableCredential", "PersonhoodCredential"],
			issuer: "did:issuer:example",
			validFrom: "2024-01-01T00:00:00Z",
			credentialSubject: {
				id: "did:web:example",
				username: "TotoroGendut",
				email: "example@email.com",
			},
			credentialStatus: {},
		};
	}

	logout(e?: Event) {
		e?.preventDefault?.();
		this.data = null;
	}
}

export const currentUser = new UserSubject();
currentUser.login();
