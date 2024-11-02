/// <reference types="svelte" />

import type { CredentialSubject } from "@veramo/core";

interface Window {
	__VOUCH_THIS_ART__: {
		workerUrl: string;
	};
}
