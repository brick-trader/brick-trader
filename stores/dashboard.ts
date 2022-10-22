import { acceptHMRUpdate, defineStore } from "pinia";
import date from "date-and-time";

export interface DashboardState {
  symbol: string;
  startDateFilterInput: string;
  endDateFilterInput: string;
}

export const useDashboard = defineStore("editor", {
  state: (): DashboardState => ({
    symbol: "2330.TW",
    startDateFilterInput: "2020-01-01",
    endDateFilterInput: date.format(new Date(), "YYYY-MM-DD"),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboard, import.meta.hot));
}
