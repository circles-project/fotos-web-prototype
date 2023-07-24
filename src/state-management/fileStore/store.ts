import { create } from "zustand";

// Add additional fields as needed
export interface FileInfoType {
    fileURL: string;
    type: string;
    roomId: string;
    eventId: string;
}

// Zustand store for files, need to implement react querying for files
// Change to use a map instead of an array?
interface FileStore {
    fileList: FileInfoType[];
    addFile: (file: FileInfoType) => void;
    setFileList: (fileList: FileInfoType[]) => void;
}

const useFileStore = create<FileStore>(
    (set) => ({
        fileList: [],
        addFile: (file: FileInfoType) =>
            set((state) => ({ fileList: [...state.fileList, file] })),
        setFileList: (fileList: FileInfoType[]) =>
            set(() => ({ fileList: fileList })),

    }),
);

export default useFileStore;
