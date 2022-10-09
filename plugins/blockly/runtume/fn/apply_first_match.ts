import { Action } from "indicatorts";

export function applyFirstMatch(
  actions: Action[],
  ...restActions: Action[][]
): Action[] {
  const result = actions.map((action, index) => {
    if (action === Action.HOLD) {
      for (const restAction of restActions) {
        if (restAction[index] && restAction[index] !== Action.HOLD) {
          return restAction[index];
        }
      }
    }
    return action;
  });

  console.log(result);

  return result;
}
