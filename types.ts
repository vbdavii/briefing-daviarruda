export interface FormData {
  companyName: string;
  segment: string;
  location: string;
  serviceType: string;
  whatsapp: string;
  email: string;
  hours: string;
  tagline: string;
  services: string;
  differential: string;
  hasLogo: string;
  colors: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export const SERVICE_TYPES = [
  "Local",
  "Online",
  "Ambos (Local e Online)"
];

export const LOGO_OPTIONS = [
  "Sim (Enviarei arquivo no WhatsApp)",
  "Não (Preciso criar)"
];