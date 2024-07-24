import { useRef, useState } from 'react';

export const useCommandRows = () => {
  const [rows, setRows] = useState<JSX.Element[]>([]);
  const commandHistory = useRef<string[]>([]);
  const commandIndex = useRef<number>(0);

  const clearRows = () => {
    setRows([]);
  };
  const generateRow = (row: JSX.Element) => {
    setRows((s) => [...s, row]);
  };

  const addCommandHistory = (command: string) => {
    if (
      commandHistory.current.length > 0 &&
      commandHistory.current[commandHistory.current.length - 1] === command
    ) {
      commandIndex.current = commandHistory.current.length;
      return;
    }

    commandHistory.current.push(command);
    commandIndex.current = commandHistory.current.length;
  };

  const getPreCommand = () => {
    if (commandHistory.current.length === 0) return '';
    return commandIndex.current > 0
      ? commandHistory.current[--commandIndex.current]
      : commandHistory.current[commandIndex.current];
  };

  const getNextCommand = () => {
    if (commandHistory.current.length === 0) return '';
    return commandIndex.current < commandHistory.current.length - 1
      ? commandHistory.current[++commandIndex.current]
      : commandHistory.current[commandIndex.current];
  };
  return {
    rows,
    generateRow,
    clearRows,
    getPreCommand,
    addCommandHistory,
    getNextCommand,
  };
};
