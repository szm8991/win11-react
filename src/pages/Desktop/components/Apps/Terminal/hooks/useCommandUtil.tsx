import { CommandNotFound, Row } from '../components';
import { useCommandInput } from './useCommandInput';
import { useCommandRows } from './useCommandRows';
type ControlKey =
  | 'Enter'
  | 'Backspace'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab';
export const useCommandUtil = () => {
  const { input, setInput, arrowLeft, arrowRight, backspace, tab, clearInput } = useCommandInput();
  const { rows, generateRow } = useCommandRows();

  const executeCommand = () => {
    generateRow(
      <>
        <Row content={input.content.trim()} />
        <CommandNotFound command={input.content.trim()} />
      </>
    );
  };
  const controlKeyMap: Record<ControlKey, () => unknown> = {
    Enter: () => {
      executeCommand();
      clearInput();
    },
    ArrowLeft: arrowLeft,
    ArrowRight: arrowRight,
    Backspace: backspace,
    Tab: () => tab,
    ArrowUp: () => console.log('ArrowUp'),
    ArrowDown: () => console.log('ArrowDown'),
  };

  const textCharHandler = (e: KeyboardEvent) => {
    if (!controlKeyMap[e.key as ControlKey]) {
      setInput(input => ({
        ...input,
        content: input.content.slice(0, input.pointAt) + e.key + input.content.slice(input.pointAt),
      }));
      arrowRight();
    }
  };

  const controlCharHandler = (e: KeyboardEvent) => {
    if (controlKeyMap[e.key as ControlKey]) controlKeyMap[e.key as ControlKey]();
  };

  return {
    rows,
    input,
    textCharHandler,
    controlCharHandler,
  };
};
