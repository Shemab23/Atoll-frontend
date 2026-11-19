// A Rule takes the value and returns an error message, or "" when the value is fine.
export type Rule = (value: string) => string;

export const rules = {
  required:
    (msg = "This field is required."): Rule =>
    (v) =>
      v.trim() ? "" : msg,

  minLength:
    (n: number, msg?: string): Rule =>
    (v) =>
      v.length >= n ? "" : (msg ?? `Must be at least ${n} characters.`),

  maxLength:
    (n: number, msg?: string): Rule =>
    (v) =>
      v.length <= n ? "" : (msg ?? `Must be at most ${n} characters.`),

  pattern:
    (re: RegExp, msg: string): Rule =>
    (v) =>
      re.test(v) ? "" : msg,

  email:
    (msg = "Please enter a valid email address."): Rule =>
    (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : msg,

  username:
    (msg = "Use 3–20 letters, numbers or underscores."): Rule =>
    (v) =>
      /^[a-zA-Z0-9_]{3,20}$/.test(v) ? "" : msg,

  // Takes a getter, not a value, so it always compares against the CURRENT other field.
  matches:
    (getOther: () => string, msg = "Values do not match."): Rule =>
    (v) =>
      v === getOther() ? "" : msg,
};

// Runs rules in order and returns the FIRST error, so the user sees one message at a time.
// Put `required` first so an empty field says "required" instead of a pattern error.
export const validate = (value: string, fieldRules: Rule[] = []): string => {
  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) return error;
  }
  return "";
};

// Validates a whole form. Use it on submit with the SAME schema you pass to the fields.
export const validateForm = <K extends string>(
  values: Record<K, string>,
  schema: Record<K, Rule[]>,
) => {
  const errors = {} as Record<K, string>;
  for (const key in schema) errors[key] = validate(values[key], schema[key]);
  const isValid = (Object.values(errors) as string[]).every((e) => !e);
  return { errors, isValid };
};

export const getPasswordStrength = (pw: string) => {
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
