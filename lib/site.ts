// Contatos e dados oficiais da loja.
// WHATSAPP: número com DDI e DDD, só dígitos (ex.: "5531999999999").
// Enquanto estiver vazio, o pedido é copiado e o cliente é levado ao contate.me.
export const WHATSAPP = "553199986643";
export const CONTACT = "https://contate.me/itacaps1";
export const INSTAGRAM = "https://www.instagram.com/itacaps1/";
export const ADDRESS = "Rua Dr. Guilherme, 272, Centro, Itabirito-MG";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Rua+Dr.+Guilherme+272+Centro+Itabirito+MG";
export const MAP_EMBED =
  "https://www.google.com/maps?q=Rua+Dr.+Guilherme+272+Centro+Itabirito+MG&output=embed";

export function whatsappLink(text?: string) {
  if (!WHATSAPP) return CONTACT;
  const base = `https://wa.me/${WHATSAPP}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type PieceGroup = "cabeca" | "cima" | "baixo" | "pes" | "extra";

export const pieces: { id: string; label: string; group: PieceGroup }[] = [
  { id: "bone", label: "Boné", group: "cabeca" },
  { id: "camiseta", label: "Camiseta", group: "cima" },
  { id: "polo", label: "Polo", group: "cima" },
  { id: "time", label: "Camisa de time", group: "cima" },
  { id: "jaqueta", label: "Jaqueta", group: "cima" },
  { id: "bermuda", label: "Bermuda", group: "baixo" },
  { id: "calca", label: "Calça", group: "baixo" },
  { id: "conjunto", label: "Conjunto", group: "baixo" },
  { id: "tenis", label: "Tênis", group: "pes" },
  { id: "chinelo", label: "Chinelo / slide", group: "pes" },
  { id: "oculos", label: "Óculos", group: "extra" },
  { id: "relogio", label: "Relógio", group: "extra" },
  { id: "perfume", label: "Perfume", group: "extra" },
];

export const groupNames: Record<PieceGroup, string> = {
  cabeca: "Cabeça",
  cima: "Parte de cima",
  baixo: "Parte de baixo",
  pes: "Nos pés",
  extra: "Pra completar",
};

export const clothingSizes = ["P", "M", "G", "GG", "XG"];
export const shoeSizes = ["37", "38", "39", "40", "41", "42", "43", "44"];
export const styles = ["De rua", "Boleiro", "Arrumadinho", "Básico", "Pra festa", "Pra presente"];
