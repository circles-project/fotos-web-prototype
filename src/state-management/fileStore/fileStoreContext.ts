import React from 'react';
import { Dispatch } from 'react';
import { FileInfoType, FilesAction } from './FileStoreProvider';

interface FileStoreContextType {
  fileList: FileInfoType[];
  dispatch: Dispatch<FilesAction>;
}

const FileStoreContext = React.createContext<FileStoreContextType>(
  {} as FileStoreContextType
);

export default FileStoreContext;