import { useState } from 'react';
import { FolderSystem } from '../folder.mock';

export const useFolderSystem = () => {
  const [currentFolderId, setCurrentFolderId] = useState(0);

  const [currentDirectory, setCurrentDirectory] = useState<string>('');

  const [folderSystem, setFolderSystem] = useState(new Map(Object.entries(FolderSystem)));

  return {
    folderSystem,
    setFolderSystem,
    currentFolderId,
    setCurrentFolderId,
    currentDirectory,
    setCurrentDirectory,
  };
};
