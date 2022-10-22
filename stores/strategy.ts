import { acceptHMRUpdate, defineStore } from "pinia";

export interface StrategyState {
  code: string | null;
}

export const useStrategy = defineStore("strategy", {
  state: (): StrategyState => ({
    code: null,
  }),
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStrategy, import.meta.hot));
}
