export function booleanAlgebra(
  left: boolean[],
  op: string,
  right: boolean[] | boolean,
): boolean[] {
  const result: boolean[] = left.map((value, index) => {
    switch (op) {
      case "AND":
        if (Array.isArray(right)) {
          return value && right[index];
        }
        return value && right;
      case "OR":
        if (Array.isArray(right)) {
          return value || right[index];
        }

        return value || right;
      case "XOR":
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
