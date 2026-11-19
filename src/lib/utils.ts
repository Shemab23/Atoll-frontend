export const getStrength = (pw: string) => {
  if (!pw) return { level: 0, label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const level = Math.max(1, Math.min(score, 4));
  return { level, label: ["", "Weak", "Fair", "Good", "Strong"][level] };
};
