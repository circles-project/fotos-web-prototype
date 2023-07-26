import { create } from "zustand";
import { MatrixClient } from "matrix-js-sdk";

// Note: MatrixClient coming from typings file of matrix js sdk which only contains some of the functions (using matrix js browser version which has no typings, weird workaround for some functions)
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
