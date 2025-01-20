import { error, type Handler } from "elysia";
import { pinata, PinataLimiter, VERIFY_CREDENTIAL } from "../_shared";
import type {
  UserCredential,
  VouchUploadRequest,
  VouchListItemKeyValue,
  VouchUploadJSONBody,
} from "../app";
import { verifyUserCredential } from "./utils/users";

export const upload: Handler = async (c) => {
  const {
    imgHash,
    reqId,
    userCredential,
    message,
    imgUrl,
  }: VouchUploadRequest = (await c.request.json()) || {};

  if (Array.isArray(userCredential.credentialSubject))
    return error(500, "currently only one credential subject supported");
  if (!userCredential?.credentialSubject?.id)
    return error(500, "no suitable credential subject detected");
  if (!userCredential?.credentialSubject?.username)
    return error(500, "credential subject incomplete - no username given");

  if (VERIFY_CREDENTIAL) {
    const { ok, message: verifyMessage } =
      await verifyUserCredential(userCredential);
    if (!ok) return error(500, verifyMessage);
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
        })
    )();

    return upload;
  } catch (err) {
    return error(500, "error uploading file");
  }
};
