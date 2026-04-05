export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));

export const difficultyLabel = (difficulty: string) => {
  if (difficulty === "HARD") return "Hard";
  if (difficulty === "MEDIUM") return "Medium";
  return "Easy";
};
