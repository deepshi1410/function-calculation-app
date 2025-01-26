import { validator } from "./validator";

export const evaluateEquation = (equation: string, value: number | null): number | null => {
  try {
    // Validate the equation using the external validator
    const validationError: string | null = validator(equation);
    if (validationError) {
      throw new Error(validationError);
    }

    // Process the equation to make it JavaScript-compatible
    const modifiedEquation = equation
      // Add '*' for implicit multiplication (e.g., "2x" -> "2*x")
      .replace(/(\d)(x)/g, "$1*$2")
      .replace(/(x)(\d)/g, "$1*$2")
      // Replace 'x' with the provided value
      .replace(/x/g, `(${value})`)
      // Convert exponentiation '^' to '**'
      .replace(/\^/g, "**");

    // Validate the final equation string to ensure it’s safe to evaluate
    if (!/^[\d+\-*/().\s*x]*$/.test(modifiedEquation)) {
      throw new Error("Invalid characters in the equation.");
    }

    // Safely evaluate the modified equation
    return Function(`return ${modifiedEquation}`)();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Evaluation Error:", error.message);
      return null; // Return null for failed evaluations
    } else {
      throw new Error("Unexpected error during equation evaluation.");
    }
  }
};
