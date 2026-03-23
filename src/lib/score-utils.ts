export function getScoreColor(score: number): { text: string; bg: string; border: string; bgMuted: string } {
  if (score >= 70) {
    return {
      text: "text-emerald-500",
      bg: "bg-emerald-500",
      border: "border-emerald-500/20",
      bgMuted: "bg-emerald-500/10",
    };
  }
  if (score >= 40) {
    return {
      text: "text-amber-500",
      bg: "bg-amber-500",
      border: "border-amber-500/20",
      bgMuted: "bg-amber-500/10",
    };
  }
  return {
    text: "text-rose-500",
    bg: "bg-rose-500",
    border: "border-rose-500/20",
    bgMuted: "bg-rose-500/10",
  };
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Very Good";
  if (score >= 60) return "Good";
  return "Needs Improvement";
}
