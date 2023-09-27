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

type CommandKey = 'clear' | 'help';

export const useCommandUtil = () => {
  const { input, setInput, arrowLeft, arrowRight, backspace, clearInput } = useCommandInput();
  const { rows, generateRow, addCommandHistory, getPreCommand, getNextCommand } = useCommandRows();

  const commandList: Record<CommandKey, () => unknown> = {
    clear() {
      clearInput();
    },
    help() {
      console.log('help');
    },
  };

  const executeCommand = () => {
    const cmd = input.content.trim();
    if (Object.keys(commandList).includes(cmd)) commandList[cmd as CommandKey]();
    else
      generateRow(
        <>
          <Row content={input.content} />
          <CommandNotFound command={input.content.trim()} />
        </>
      );
    addCommandHistory(cmd);
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
          setInput(input => ({
            ...input,
            content: key,
            pointAt: key.length,
          }));
          break;
        }
      }
      // todo 变成 ⚠️，加一个报警音效
      if (alert) {
        console.log('alert');
      }
    },
    ArrowUp: () => {
      const command = getPreCommand();
      setInput(input => ({
        ...input,
        content: command,
        pointAt: command.length,
      }));
    },
    ArrowDown: () => {
      // todo why
      /* // 这种写法会再渲染一次组件
      setInput(input => ({
        ...input,
        content: getNextCommand(),
      })); */
      const command = getNextCommand();
      setInput(input => ({
        ...input,
        content: command,
        pointAt: command.length,
      }));
    },
  };

  const textCharHandler = (e: KeyboardEvent) => {
    if (!controlKeyMap[e.key as ControlKey]) {
      console.log(e.key.length);
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
