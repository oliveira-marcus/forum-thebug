export default function translateCategory(
  category: "General" | "Events" | "Finances" | "Polls" | "Sports"
) {
  const dictionary = {
    General: "Geral",
    Events: "Eventos",
    Finances: "Finanças",
    Polls: "Enquetes",
    Sports: "Esportes",
  };

  return dictionary[category];
}
