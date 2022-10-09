import { Action } from "indicatorts";

export function applyFirstMatch(actions1: Action[], actions2: Action[]) {
  return actions1.map((action, index) => {
    if (action === Action.HOLD && actions2[index] !== Action.HOLD)
      return actions2[index];
    return action;
  });
}
