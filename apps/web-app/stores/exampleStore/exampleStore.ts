import { create } from "zustand";

type State = {
  bears: number;
  actions: {
    increaseBearsCount: (by: number) => void;
    reset: () => void;
  };
};

const initialState: Omit<State, "actions"> = {
  bears: 0,
};

/** Documentation for ExampleStore */
const useExampleStore = create<State>((set) => ({
  ...initialState,
  actions: {
    increaseBearsCount: (by) => set((state) => ({ bears: state.bears + by })),
    reset: () => set(initialState),
  },
}));

export const useBears = () => useExampleStore((state) => state.bears);
export const useBearsActions = () => useExampleStore((state) => state.actions);
