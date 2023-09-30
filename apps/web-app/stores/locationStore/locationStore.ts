import { create } from "zustand";

type State = {
  enabled: boolean;
  coords?: [number, number];
  listenerId?: number;
  actions: {
    enable: () => void;
    disable: () => void;
  };
};

const initialState: Omit<State, "actions"> = {
  enabled: false,
  listenerId: undefined,
  coords: undefined,
};

/** Track user location */
const useLocationStore = create<State>((set, get) => ({
  ...initialState,
  actions: {
    enable: () => {
      const config = {
        enableHighAccuracy: true,
      };

      const listenerId = navigator.geolocation.watchPosition(
        ({ coords }) => set({ enabled: true, coords: [coords.latitude, coords.longitude] }),
        () => set({ enabled: false, coords: undefined, listenerId: undefined }),
        config
      );

      set({ listenerId });
    },
    disable: () => {
      const currentListenerId = get().listenerId;

      if (currentListenerId) {
        navigator.geolocation.clearWatch(currentListenerId);
        set(() => ({ enabled: false, listenerId: undefined, coords: undefined }));
      }
    },
  },
}));

export const useLocationIsEnabled = () => useLocationStore((state) => state.enabled);
export const useLocationCoords = () => useLocationStore((state) => state.coords);
export const useLocationActions = () => useLocationStore((state) => state.actions);
