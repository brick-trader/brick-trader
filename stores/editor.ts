import { acceptHMRUpdate, defineStore } from "pinia";

export interface EditorState {
  workspaceSnapshot: {
    [x: string]: any;
  } | null;
}

export const useEditor = defineStore("editor", {
  state: (): EditorState => ({
    workspaceSnapshot: null,
  }),
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditor, import.meta.hot));
}
