import { acceptHMRUpdate, defineStore } from "pinia";

export interface StrategyState {
  code: string | null;
}

export const useStrategy = defineStore("strategy", {
  state: (): StrategyState => ({
    code: null,
  }),
  actions: {
    isStrategyVaild() {
      if (!this.code) return false;

      const vaildationRegex =
        /^\(\{name: \"[A-Za-z][A-Za-z0-9]*\", strategy: \(stock\) => runtime\.fn\.applyFirstMatch\(\(runtime\.fn\.(.*)\)\)\}\)$/;
      const match = this.code.match(vaildationRegex);
      return match !== null && !match[1].includes("[]");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStrategy, import.meta.hot));
}
