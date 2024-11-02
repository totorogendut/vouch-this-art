import type {
	IDIDManager,
	IResolver,
	IDataStore,
	IDataStoreORM,
	IKeyManager,
	ICredentialPlugin,
} from "@veramo/core";
import { createAgent } from "@veramo/core";
import { DIDManager } from "@veramo/did-manager";
import { EthrDIDProvider } from "@veramo/did-provider-ethr";
import { KeyManager } from "@veramo/key-manager";
import { KeyManagementSystem, SecretBox } from "@veramo/kms-local";
import { CredentialPlugin } from "@veramo/credential-w3c";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { Resolver } from "did-resolver";
import { getResolver as ethrDidResolver } from "ethr-did-resolver";
import { getResolver as webDidResolver } from "web-did-resolver";
import {
	Entities,
	KeyStore,
	DIDStore,
	PrivateKeyStore,
	migrations,
} from "@veramo/data-store";
import { DataSource } from "typeorm";
import "dotenv/config";

const DATABASE_FILE = "did-database.sqlite";
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const KMS_SECRET_KEY = process.env.KMS_SECRET_KEY;

if (!INFURA_PROJECT_ID) throw "no INFURA_PROJECT_ID env variable found";
if (!KMS_SECRET_KEY) throw "no KMS_SECRET_KEY env variable found";

const dbConnection = new DataSource({
	type: "sqlite",
	database: DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ["error", "info", "warn"],
	entities: Entities,
}).initialize();

export const agent = createAgent<
	IDIDManager &
		IKeyManager &
		IDataStore &
		IDataStoreORM &
		IResolver &
		ICredentialPlugin
>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnection),
			kms: {
				local: new KeyManagementSystem(
					new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY)),
				),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnection),
			defaultProvider: "did:ethr:sepolia",
			providers: {
				"did:ethr:sepolia": new EthrDIDProvider({
					defaultKms: "local",
					network: "sepolia",
					rpcUrl: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialPlugin(),
	],
});
