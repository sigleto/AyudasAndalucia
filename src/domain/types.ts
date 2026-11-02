export const categories = [
  "Desempleo",
  "Ayudas sociales",
  "Vivienda",
  "Familias",
  "Becas y estudios",
  "Emprendimiento",
  "Discapacidad",
  "Agricultura",
  "Dependencia",
  "Energía",
] as const;
export type Category = (typeof categories)[number];
export type AidStatus =
  "open" | "closed" | "pending" | "permanent" | "historical" | "unknown";
export type Aid = {
  id: string;
  name: string;
  category: Category;
  audience: string[];
  agency: string;
  summary: string;
  requirements: string[];
  amount: string;
  compatibility: string;
  status: AidStatus;
  period: string;
  opens?: string;
  closes?: string;
  steps: string[];
  documents: string[];
  source: string;
  reviewed: string;
  calculator?: "multiple";
  simulatorSource?: string;
  related?: string[];
};
export const statusLabels: Record<AidStatus, string> = {
  open: "Convocatoria abierta",
  closed: "Convocatoria cerrada",
  pending: "Pendiente de convocatoria",
  permanent: "Derecho o servicio permanente",
  historical: "Información histórica",
  unknown: "Consultar convocatoria oficial",
};
