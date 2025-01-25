export const validator = (equation: string): string | null => {
  // Allow empty or partially entered equations
  if (!equation) return null;

  const validOperators = /^[0-9x+\-*/^(). ]*$/;

  if (!validOperators.test(equation)) {
    return 'Only x, +, -, *, /, ^ operators, and numbers are allowed.';
  }

  return null;
};
  