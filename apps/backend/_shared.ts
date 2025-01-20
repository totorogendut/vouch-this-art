/// <reference types="@cloudflare/workers-types" />
import Bottleneck from "bottleneck";
import "dotenv/config";
import { PinataSDK } from "pinata";

/** enable verifier this if goes into production and
have a proper W3C compliant user credential flow */
export const VERIFY_CREDENTIAL: boolean = false;

// config as per API limit
export const PinataLimiter = new Bottleneck({
  maxConcurrent: 20,
  minTime: (1000 * 60) / 1000,
});

export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PUBLIC_GATEWAY_URL,
});
