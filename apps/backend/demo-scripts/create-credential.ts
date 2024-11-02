import { createManager, createCredential } from "../src/utils/veramo";

await createCredential("default", {
	id: "did:web:example.com",
	avatar: "https://localhost:3000/demo/avatar.png",
	name: "TotoroGendut",
});
