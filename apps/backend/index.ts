import { PinataLimiter, VERIFY_CREDENTIAL } from "./_shared";
// import main from "./src/main";
// import lists from "./src/lists";
// import upload from "./src/upload";
// import verfiyVouch from "./src/verify-vouch";
import { Elysia, error } from "elysia";
import { list } from "./src/lists";
import { upload } from "./src/upload";
import { verifyVouch } from "./src/verify-vouch";
import { vouchByUser } from "./src/vouch-by-users";

const port = Number.parseInt(process.env.PORT || "3000");
console.log(`Running at http://localhost:${port}`);

new Elysia()
  .get("/vouch-list/:hash", list)
  .post("/vouch", upload)
  .get("/verify-vouch/:cid", verifyVouch)
  .get("/user/:id", vouchByUser)
  .listen(port);
