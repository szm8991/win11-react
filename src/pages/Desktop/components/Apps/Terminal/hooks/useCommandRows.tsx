import { useState } from 'react';

export const useCommandRows = () => {
  const [rows, setRows] = useState<JSX.Element[]>([]);
  const generateRow = (row: JSX.Element) => {
    setRows(s => [...s, row]);
  };

  return { rows, generateRow };
};
