import { validator } from "./validator";

export const evaluateEquation = (equation: string, value: number): number | null => {
  try {
    const validationError:string | null = validator(equation);
    if (validationError) {
      throw new Error(validationError);
    }

    // Replace 'x' with the actual value in the equation
    // Handle cases like '2x' -> '2*x', 'x2' -> 'x*2' (Multiplication cases)
    const modifiedEquation = equation
      .replace(/(\d)(x)/g, '$1*$2')
      .replace(/(x)(\d)/g, '$1*$2')
      .replace(/x/g, value.toString());

    // Convert exponentiation '^' to '**' for proper JavaScript evaluation
    const equationWithExponentiation = modifiedEquation.replace(/\^/g, '**');
    return eval(equationWithExponentiation);
  } catch (error) {
    console.error('Error in evaluating the equation:', error);
    throw new Error('Error in evaluating the equation: ' + error?.message);
  }
};

