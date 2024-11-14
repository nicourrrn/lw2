import * as crypto from "crypto";
export default defineEventHandler(async (event) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const signKeys = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const [signKey, verifyKey] = [signKeys.privateKey, signKeys.publicKey];
  return {
    publicKey: publicKey
      .export({ type: "spki", format: "pem" })
      .toString("base64"),
    privateKey: privateKey
      .export({ type: "pkcs8", format: "pem" })
      .toString("base64"),
    signKey: signKey
      .export({ type: "pkcs8", format: "pem" })
      .toString("base64"),
    verifyKey: verifyKey
      .export({ type: "spki", format: "pem" })
      .toString("base64"),
  };
});
