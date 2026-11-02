import { Aid, AidStatus, Category } from "./types";

export function madridDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export function effectiveStatus(aid: Aid, today = madridDate()): AidStatus {
  if (aid.status === "historical") return "historical";
  if (aid.closes && today > aid.closes) return "closed";
  if (aid.opens && today < aid.opens) return "pending";
  // An old snapshot without a deadline must never imply an indefinitely open call.
  if (aid.status === "open" && !aid.closes && today > aid.reviewed)
    return "unknown";
  return aid.status;
}
export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export type Filters = {
  query?: string;
  category?: Category;
  audience?: string;
  status?: AidStatus;
  favorites?: string[];
};
export function filterAids(
  aids: Aid[],
  filters: Filters,
  today = madridDate(),
): Aid[] {
  const words = normalize(filters.query ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return aids.filter((a) => {
    const haystack = normalize(
      [a.name, a.category, a.summary, ...a.audience, ...a.requirements].join(
        " ",
      ),
    );
    return (
      words.every((w) => haystack.includes(w)) &&
      (!filters.category || a.category === filters.category) &&
      (!filters.audience || a.audience.includes(filters.audience)) &&
      (!filters.status || effectiveStatus(a, today) === filters.status) &&
      (!filters.favorites || filters.favorites.includes(a.id))
    );
  });
}
export function parseInteger(value: string, min: number, max: number): number {
  if (!/^\d+$/.test(value.trim()))
    throw new Error("Introduce un número entero, sin decimales ni letras.");
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < min || number > max)
    throw new Error(`Introduce un número entre ${min} y ${max}.`);
  return number;
}
export const SMI_2026 = 1221;
export function multipleBirth(
  children: string,
  disabled: string,
  year: string,
) {
  if (year !== "2026")
    throw new Error(
      "Solo se ha verificado el SMI de 2026. Consulta al INSS para otros años.",
    );
  const count = parseInteger(children, 2, 20);
  const disabilityCount = parseInteger(disabled, 0, count);
  const weighted = count + disabilityCount;
  const factor = weighted === 2 ? 4 : weighted === 3 ? 8 : 12;
  return {
    count,
    disabilityCount,
    weighted,
    factor,
    smi: SMI_2026,
    total: factor * SMI_2026,
  };
}
export type Answer = "yes" | "no" | "unknown";
export function guidance(
  requirements: string[],
  answers: Record<number, Answer>,
): string[] {
  if (requirements.some((_, index) => !answers[index]))
    throw new Error("Responde a todos los puntos; puedes elegir «No lo sé».");
  return requirements.map(
    (requirement, index) =>
      `${answers[index] === "yes" ? "Indicas que lo cumples (sin verificar)" : answers[index] === "no" ? "Posible impedimento: consulta excepciones" : "Pendiente de comprobar"}: ${requirement}`,
  );
}
export function decodeFavorites(raw: string | null, ids: string[]): string[] {
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.some((id) => typeof id !== "string"))
    throw new Error("Formato de favoritos no válido.");
  return [...new Set(parsed.filter((id) => ids.includes(id)))];
}
export const escapeHTML = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
