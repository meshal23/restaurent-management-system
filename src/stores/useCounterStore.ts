/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state: any) => ({ count: state.count + 1 })),
  decrement: () => set((state: any) => ({ count: state.count - 1 })),
}));

export default useCounterStore;
