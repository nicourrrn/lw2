import * as crypto from "crypto";
export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  return {
    result: crypto
      .publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(message),
      )
      .toString("base64"),
  };
});
