export function useRandom(digit?: number): number {
  if (typeof digit === "undefined") {
    return Math.ceil(
      Math.random() * (Math.ceil(Math.random() * 10) > 5 ? 1000 : 100)
    );
  }

  return Math.ceil(Math.random() * Math.pow(10, digit));
}

export function useSymbol(operations: string[] = ["+", "-", "×", "÷"]) {
  return operations[useRandom() % operations.length];
}

export function useCalculate(digit1: number, symbol: string, digit2: number) {
  switch (true) {
    case "+" === symbol:
      return digit1 + digit2;
    case "-" === symbol:
      return digit1 - digit2;
    case "×" === symbol:
      return digit1 * digit2;
    case "÷" === symbol:
      return digit1 / digit2;
  }
}
