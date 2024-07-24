import { useState } from 'react';
import { CommandNotFound, Help, Row } from '../components';
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

type CommandKey = 'clear' | 'help';

export const useCommandUtil = () => {
  const { input, setInput, arrowLeft, arrowRight, backspace, clearInput } =
    useCommandInput();
  const {
    rows,
    generateRow,
    clearRows,
    addCommandHistory,
    getPreCommand,
    getNextCommand,
  } = useCommandRows();
  const [alert, setAlert] = useState<boolean>(false);
  const commandList: Record<CommandKey, () => unknown> = {
    clear() {
      clearInput();
      clearRows();
    },
    help() {
      generateRow(
        <>
          <Row content={input.content} />
          <Help />
        </>,
      );
    },
  };

  const executeCommand = () => {
    const cmd = input.content.trim();
    if (Object.keys(commandList).includes(cmd))
      commandList[cmd as CommandKey]();
    else
      generateRow(
        <>
          <Row content={input.content} />
          <CommandNotFound command={cmd} />
        </>,
      );
    addCommandHistory(input.content);
  };

  const controlKeyMap: Record<ControlKey, () => unknown> = {
    Enter: () => {
      if (input.content.trim().length !== 0) executeCommand();
      clearInput();
    },
    ArrowLeft: arrowLeft,
    ArrowRight: arrowRight,
    Backspace: backspace,
    Tab: () => {
      let alert = true;
      for (const key of Object.keys(commandList)) {
        if (key.startsWith(input.content.trim())) {
          alert = false;
          setInput((input) => ({
            ...input,
            content: key,
            pointAt: key.length,
          }));
          break;
        }
      }
      alert && setAlert(alert);
    },
    ArrowUp: () => {
      const command = getPreCommand();
      setInput((input) => ({
        ...input,
        content: command,
        pointAt: command.length,
      }));
    },
    ArrowDown: () => {
      /* 
      setInput传入的回调执行了两次，所以getNextCommand()也执行了两次
      tmd原来忘了关react严格模式😅,所以setState传入的回调执行了两遍
      以后记住写法上就用下面的吧
      setInput(input => ({
        ...input,
        content: getNextCommand(),
      })); */
      const command = getNextCommand();
      setInput((input) => {
        console.log('run');
        return {
          ...input,
          content: command,
          pointAt: command.length,
        };
      });
    },
  };

  const textCharHandler = (e: KeyboardEvent) => {
    if (!controlKeyMap[e.key as ControlKey]) {
      setInput((input) => ({
        ...input,
        content:
          input.content.slice(0, input.pointAt) +
          e.key +
          input.content.slice(input.pointAt),
      }));
      arrowRight();
    }
  };

  const controlCharHandler = (e: KeyboardEvent) => {
    if (controlKeyMap[e.key as ControlKey]) {
      controlKeyMap[e.key as ControlKey]();
    }
  };

  return {
    rows,
    input,
    alert,
    setAlert,
    textCharHandler,
    controlCharHandler,
  };
};
