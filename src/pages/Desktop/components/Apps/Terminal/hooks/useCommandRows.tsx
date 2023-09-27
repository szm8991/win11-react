import { useRef, useState } from 'react';

export const useCommandRows = () => {
  const [rows, setRows] = useState<JSX.Element[]>([]);
  const commandHistory = useRef<string[]>([]);
  const commandIndex = useRef<number>(0);

  const generateRow = (row: JSX.Element) => {
    setRows(s => [...s, row]);
  };

  const addCommandHistory = (command: string) => {
    commandHistory.current.push(command);
    commandIndex.current++;
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

  return { rows, generateRow, getPreCommand, addCommandHistory, getNextCommand };
};
