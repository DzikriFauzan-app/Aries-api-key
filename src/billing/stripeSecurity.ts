import * as crypto from "crypto";

export class StripeSecurity {
  static verify(payload: string, sig: string, secret: string): boolean {
    try {
      const parts = sig.split(',');
      const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1];
      const signature = parts.find(p => p.startsWith('v1='))?.split('=')[1];

      if (!timestamp || !signature) return false;

      const signedPayload = `${timestamp}.${payload}`;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("hex");

      // PROTEKSI PANJANG: Jika beda, otomatis palsu.
      if (signature.length !== expectedSignature.length) {
        return false;
      }

      // PROTEKSI TIMING: Bandingkan isi buffer dengan aman.
      const isMatch = crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedSignature, "hex")
      );

      const isExpired = Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300;

      return isMatch && !isExpired;
    } catch (e) {
      return false;
    }
  }
}
