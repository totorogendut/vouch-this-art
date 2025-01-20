import type { CredentialSubject } from "@veramo/core";
import type { FileListItem } from "pinata";

interface VouchListItemKeyValue extends VouchArtUserCredentialSubject {
  message?: string;
  imgUrl?: string;
}

interface VouchListItem extends FileListItem {
  keyvalues: VouchListItemKeyValue;
  is_duplicate?: boolean;
}

interface VouchArtUserCredentialSubject extends CredentialSubject {
  email?: string;
  username: string;
}

interface VouchUploadRequest {
  imgHash: string;
  reqId: string;
  userCredential: UserCredential;
  message?: string;
  imgUrl?: string;
}

interface VouchUploadJSONBody {
  imgHash: string;
  userId: string;
  userCredential: UserCredential;
  message: string;
}

// from VIDOS example
interface ProofCredential {
  created: string;
  proofPurpose: string;
  proofValue: string;
  type: string;
  verificationMethod: string;
  cryptosuite?: string;
}

interface UserCredential extends CredentialSubject {
  "@context": string[];
  type: string[];
  issuer: string;
  validFrom: string;
  validUntil?: string;
  credentialSubject: VouchArtUserCredentialSubject;
  credentialStatus?: Record<string, unknown>;
  proof?: ProofCredential;
}
