import md5Hex from "md5-hex";
import { imgToUint8Array } from "./images";
import { expose } from "comlink";

export const imagesWorker = {
	getMD5HashFromImage(data: Uint8Array) {
		console.log("Loading md5 hash");
		return md5Hex(data);
	},
};

expose(imagesWorker);
