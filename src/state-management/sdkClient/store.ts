import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { MatrixClient } from "matrix-js-sdk";

interface SdkClientStore {
  client: MatrixClient;
  setClient: (client: MatrixClient) => void;
}

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
