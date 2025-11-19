export const safeEvaluate = (expression: string): string => {
  if (!expression) return '';

  // Pre-process expression to handle scientific notation and UI symbols
  let cleanExp = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/\^/g, '**')
    .replace(/√\(/g, 'Math.sqrt(')
    // Handle functions
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(');

  // Handle Factorial (!) - simplistic implementation for small integers
  if (cleanExp.includes('!')) {
    cleanExp = cleanExp.replace(/(\d+)!/g, (match, number) => {
      const n = parseInt(number);
      if (n < 0) return 'NaN';
      if (n > 170) return 'Infinity'; // JS limit
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i;
      return result.toString();
    });
  }

  try {
    // eslint-disable-next-line no-new-func
    const result = new Function('return ' + cleanExp)();
    
    if (!isFinite(result) || isNaN(result)) {
      return 'Error';
    }

    // Handle floating point precision issues (e.g., 0.1 + 0.2)
    const precisionResult = parseFloat(result.toPrecision(15));
    return precisionResult.toString();
  } catch (error) {
    return 'Error';
  }
};

export const formatNumber = (numStr: string): string => {
  if (numStr === 'Error' || numStr === 'NaN') return numStr;
  if (!numStr) return '';

  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 10,
    useGrouping: true,
  }).format(num);
};

// Basic check to prevent multiple operators in a row
export const isValidInput = (currentExp: string, input: string): boolean => {
  const operators = ['+', '-', '×', '÷', '^', '%', '.'];
  const lastChar = currentExp.slice(-1);

  if (operators.includes(lastChar) && operators.includes(input)) {
    // Allow negative sign after an operator? Not for this simple validation, 
    // we usually replace the last operator or ignore.
    // Exception: minus can sometimes be unary, but for simplicity here we'll just block or replace.
    return false;
  }
  return true;
};