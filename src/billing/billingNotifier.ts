import { getGraceStatus } from "./gracePolicy";

export class BillingNotifier {
  static getAlert(expireAt: number) {
    const status = getGraceStatus(expireAt);

    if (status.status === "GOLDEN_HOUR") {
      return {
        type: "URGENT_PROMO",
        title: "🚨 PERINGATAN TERAKHIR: AKSES AKAN DIPUTUS",
        message: `Sisa waktu Anda 24 jam sudah hampir habis. Ambil penawaran rahasia ini sekarang atau akun Anda kembali ke FREE (1 Slot IP).`,
        timer: "10:00", // Start timer 10 menit
        offers: status.offers,
        styles: "background: red; color: white; font-weight: bold; animation: blink 1s infinite;"
      };
    }
    return null;
  }
}
