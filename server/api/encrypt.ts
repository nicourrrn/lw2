import * as crypto from "crypto";
export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  const body = await readBody(event);
  console.log(body);
  const { publicKey } = body;
  const publicKeyWraped = crypto.createPublicKey(publicKey);
  return {
    result: crypto
      .publicEncrypt(
        {
          key: publicKeyWraped,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(message),
      )
      .toString("base64"),
  };
});
