import chalk from "chalk";
import { pinata, PinataLimiter } from "../_shared";
import { verifyUserCredential } from "./utils/users";
import type { VouchUploadJSONBody } from "../app";
import { error, type Handler } from "elysia";

interface VouchJSONData extends JSON, VouchUploadJSONBody {}

/**
 * Currently will failed due to no proper auth mechanism
 * implemented yet.
 */
export const verifyVouch: Handler = async (c) => {
  const { cid } = c.params;

  console.log(chalk.bgMagenta.bold(" VERIFYING "), cid);

  try {
    const { data } = await PinataLimiter.wrap(() => pinata.gateways.get(cid))();
    if (!("userCredential" in (data as VouchJSONData)))
      return error(504, "wrong format");

    const { userCredential } = data as VouchJSONData;

    const { ok, message } = await verifyUserCredential(userCredential);
    if (ok) return "verify successful";
    return error(503, message || `verify failed: ${message}`);
  } catch (err) {
    return error(500, `something wrong: ${error}`);
  }
};
