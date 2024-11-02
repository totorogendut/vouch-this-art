/// <reference types="@cloudflare/workers-types" />
import type { Context } from "hono";
import { PinataSDK } from "pinata";
import { Hono } from "hono";
import Bottleneck from "bottleneck";
import "dotenv/config";

/** enable verifier this if goes into production and
have a proper W3C compliant user credential flow */
export const VERIFY_CREDENTIAL: boolean = false;

// config as per API limit
export const PinataLimiter = new Bottleneck({
	maxConcurrent: 20,
	minTime: (1000 * 60) / 1000,
});

export function ctxSetup(c: Context): {
	pinata: PinataSDK;
} {
	c.header("Access-Control-Allow-Origin", "*");

	return {
		pinata: new PinataSDK({
			pinataJwt: process.env.PINATA_JWT,
			pinataGateway: process.env.PUBLIC_GATEWAY_URL,
		}),
	};
}

export const app = new Hono();
