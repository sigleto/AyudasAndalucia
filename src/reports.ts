import { Platform, Share } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Aid } from "./domain/types";
import { escapeHTML, madridDate } from "./domain/logic";
export async function exportReport(aid: Aid, lines: string[]) {
  const disclaimer =
    "Orientación informativa. No acredita requisitos ni garantiza la concesión. Comprueba la fuente oficial.";
  const text = [
    aid.name,
    `Informe: ${madridDate()} · Fuente revisada: ${aid.reviewed}`,
    ...lines,
    disclaimer,
    aid.source,
  ].join("\n\n");
  if (Platform.OS === "web") {
    await Share.share({ message: text });
    return;
  }
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;color:#173d35;padding:32px;font-size:14px;line-height:1.6}h1{font-size:24px}p{overflow-wrap:anywhere}footer{margin-top:24px;border-top:1px solid #ccc}</style></head><body><h1>${escapeHTML(aid.name)}</h1><p>Informe: ${madridDate()} · Fuente revisada: ${aid.reviewed}</p>${lines.map((line) => `<p>${escapeHTML(line)}</p>`).join("")}<footer><p>${disclaimer}</p><p>${escapeHTML(aid.source)}</p></footer></body></html>`;
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync())
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Informe orientativo",
    });
  else await Print.printAsync({ uri });
}
