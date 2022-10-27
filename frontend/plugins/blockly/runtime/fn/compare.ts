export function compare(
  left: number[],
  op: string,
  right: number | number[],
): boolean[] {
  const result: boolean[] = left.map((value, index) => {
    switch (op) {
      case "GT":
        if (Array.isArray(right)) {
          return value > right[index];
        }
        return value > right;
      case "LT":
        if (Array.isArray(right)) {
          return value < right[index];
        }

        return value < right;
      case "EQ":
        if (Array.isArray(right)) {
          return value === right[index];
        }

        return value === right;
      case "GE":
        if (Array.isArray(right)) {
          return value >= right[index];
        }

        return value >= right;
      case "LE":
        if (Array.isArray(right)) {
          return value <= right[index];
        }

        return value <= right;
      case "NE":
        if (Array.isArray(right)) {
          return value !== right[index];
        }

        return value !== right;
      default:
        return false;
    }
  });

  console.log(result);

  return result;
}
