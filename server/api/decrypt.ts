import * as crypto from "crypto";
export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);
  const { privateKey } = await readBody(event);
  const privateKeyWraped = crypto.createPrivateKey(privateKey);
  return {
    result: crypto
      .publicDecrypt(
        {
          key: privateKeyWraped,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(message),
      )
      .toString("base64"),
  };
});
