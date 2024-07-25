import { useEffect, useState } from 'react';
import { FolderSystem } from '../folder.mock';

export const useFolderSystem = () => {
  const [currentFolderId, setCurrentFolderId] = useState(0);

  const [currentDirectory, setCurrentDirectory] = useState<string>(FolderSystem[0].name);

  const [folderSystem, setFolderSystem] = useState(new Map(Object.entries(FolderSystem)));

  const [path, setPath] = useState(`ming:${currentDirectory} #`);

  useEffect(() => {
    setPath(`ming:${currentDirectory} #`);
  }, [currentDirectory]);

  return {
    folderSystem,
    setFolderSystem,
    currentFolderId,
    setCurrentFolderId,
    currentDirectory,
    setCurrentDirectory,
    path,
  };
};
