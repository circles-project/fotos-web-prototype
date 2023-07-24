import { create } from "zustand";
import { MatrixClient } from "matrix-js-sdk";

interface SdkClientStore {
  client: MatrixClient;
  setClient: (client: MatrixClient) => void;
}

// Zustand store for the matrix client
const useSdkClientStore = create<SdkClientStore>(
    (set) => ({
        client: {} as MatrixClient,
        setClient: (client: MatrixClient) =>
        set(() => ({
            client: client,
        })),
    }),
);

export default useSdkClientStore;
