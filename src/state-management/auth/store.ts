import { StateCreator, create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthStages {
  isLoggingIn: boolean;
  userID: string;
  enteredPassword: boolean;
  isLoading: boolean;
  isBsspeke: boolean;
  userResponse: any;
}

interface AuthStore {
  stages: AuthStages;
  domainStore: string;
  serverResponse: any;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
  setUserID: (userID: string) => void;
  setEnteredPassword: (enteredPassword: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsBsspeke: (isBsspeke: boolean) => void;
  setUserResponse: (userResponse: {}) => void;
  reset: () => void;
  setDomainStore: (domainStore: string) => void;
  setServerResponse: (serverResponse: any) => void;
}

// Zustand store for auth
const useAuthStore = create<AuthStore>(
  persist<AuthStore>(
    (set) => ({
      stages: {
        isLoggingIn: false,
        userID: "",
        enteredPassword: false,
        isLoading: false,
        isBsspeke: false,
        userResponse: {},
      },
      domainStore: "",
      serverResponse: {},
      setIsLoggingIn: (isLoggingIn: boolean) =>
        set((state) => ({
          stages: { ...state.stages, isLoggingIn: isLoggingIn },
        })),
      setUserID: (userID: string) =>
        set((state) => ({
          stages: { ...state.stages, userID },
        })),
      setEnteredPassword: (enteredPassword: boolean) =>
        set((state) => ({
          stages: { ...state.stages, enteredPassword: enteredPassword },
        })),
      setIsLoading: (isLoading: boolean) =>
        set((state) => ({
          stages: { ...state.stages, isLoading: isLoading },
        })),
      setIsBsspeke: (isBsspeke: boolean) =>
        set((state) => ({
          stages: { ...state.stages, isBsspeke: isBsspeke },
        })),
      setUserResponse: (userResponse: any) =>
        set((state) => ({
          stages: { ...state.stages, userResponse: userResponse },
        })),
      reset: () =>
        set(() => ({
          stages: {
            isLoggingIn: false,
            userID: "",
            enteredPassword: false,
            isLoading: false,
            isBsspeke: false,
            userResponse: {},
          },
        })),
      setDomainStore: (domainStore: string) => set(() => ({ domainStore: domainStore })),
      setServerResponse: (serverResponse: any) =>
        set(() => ({
          serverResponse: serverResponse,
        })),
    }),
    {
      name: "auth-store", // Name for persisted data in local storage (default storage is localStorage)
      storage: createJSONStorage(() => sessionStorage), // Persist data in session storage
    }
  ) as StateCreator<AuthStore, [], []>
);

export default useAuthStore;
