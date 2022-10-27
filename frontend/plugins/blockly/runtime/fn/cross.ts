export function cross(left: number[], op: string, right: number[]): boolean[] {
  const result: boolean[] = left.map((value, index) => {
    if (index === 0) return false;

    switch (op) {
      case "CROSSOVER":
        return value > right[index] && left[index - 1] < right[index - 1];
      case "CROSSDOWN":
        return value < right[index] && left[index - 1] > right[index - 1];
      default:
        return false;
    }
  });

  console.log(result);

  return result;
}
