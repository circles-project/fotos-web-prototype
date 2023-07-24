import { ReactNode, useReducer } from 'react';
import FileStoreContext from './fileStoreContext';

export interface FileInfoType {
    fileURL: string;
    type: string;
}

interface AddFile {
  type: 'ADD';
  file: FileInfoType;
}

// interface DeleteFile {
//   type: 'DELETE';
//   fileId: number;
// }

interface SetInitialFiles {
    type: 'SET';
    files: FileInfoType[];
}

export type FilesAction = AddFile | SetInitialFiles;

const fileStoreReducer = (
  fileList: FileInfoType[],
  action: FilesAction
): FileInfoType[] => {
  switch (action.type) {
    case 'ADD':
      return [action.file, ...fileList];
    // case 'DELETE':
    //   return filesList.filter((t) => t.id !== action.taskId);
    case 'SET':
        return fileList = action.files;
  }
};

interface Props {
  children: ReactNode;
}

const FileStoreProvider = ({ children }: Props) => {
  const [fileList, dispatch] = useReducer(fileStoreReducer, []);

  return (
    <FileStoreContext.Provider value={{ fileList, dispatch }}>
      {children}
    </FileStoreContext.Provider>
  );
};

export default FileStoreProvider;