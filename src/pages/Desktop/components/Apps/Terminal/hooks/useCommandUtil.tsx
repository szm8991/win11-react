import { useState } from 'react';
import { CommandNotFound, Help, Row } from '../components';
import { useCommandInput } from './useCommandInput';
import { useCommandRows } from './useCommandRows';
import { useFolderSystem } from './useFolderSystem';

type ControlKey = 'Enter' | 'Backspace' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Tab';

type CommandKey = 'clear' | 'help' | 'pwd' | 'cat' | 'ls';

export const useCommandUtil = () => {
  const { input, setInput, arrowLeft, arrowRight, backspace, clearInput } = useCommandInput();
  const { rows, generateRow, clearRows, addCommandHistory, getPreCommand, getNextCommand } = useCommandRows();
  const [alert, setAlert] = useState<boolean>(false);
  const { currentFolderId, folderSystem } = useFolderSystem();
  const commandList: Record<CommandKey, (arg: string) => unknown> = {
    ls() {
      let res: string[] = [];
      folderSystem.get(`${currentFolderId}`)?.childIds?.forEach((id) => {
        res.push(folderSystem.get(`${id}`)!.name);
      });
      if (res.length === 0) {
        generateRow(
          <>
            <Row content={input.content} />
            <div>There are no other folders or files in the current directory.</div>
          </>,
        );
      } else {
        generateRow(<Row content={input.content} />);
        generateRow(
          <span className="flex gap-4">
            {res.map((item, index) => (
              <span key={index} className={item.includes('.') ? 'text-blue-500' : ''}>
                {item}
              </span>
            ))}
          </span>,
        );
      }
    },
    cat(arg = '') {
      let find = false;
      folderSystem.get(`${currentFolderId}`)?.childIds?.forEach((id: number) => {
        const item = folderSystem.get(`${id}`)!;
        if (item.name === arg) {
          find = true;
          generateRow(
            <>
              <Row content={input.content} />
              <div>{item.content}</div>
            </>,
          );
        }
      });
      if (!find)
        generateRow(
          <>
            <Row content={input.content} />
            <div>{input.content}: 没有那个文件或目录</div>
          </>,
        );
    },
    pwd() {
      generateRow(
        <>
          <Row content={input.content} />
          <div>{folderSystem.get(`${currentFolderId}`)?.name}</div>
        </>,
      );
    },
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
    const [cmd, args] = input.content.trim().split(' ');
    if (Object.keys(commandList).includes(cmd)) commandList[cmd as CommandKey](args);
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
      const [cmd, args] = input.content.trim().split(' ');
      if (args === void 0) {
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
      } else {
        // 有参数的情况下，自动补全文件名
        const childIds = folderSystem.get(`${currentFolderId}`)?.childIds;
        if (childIds) {
          for (const id of childIds) {
            const item = folderSystem.get(`${id}`);
            if (item && item.name.startsWith(args)) {
              setInput((input) => ({
                ...input,
                content: cmd + ' ' + item.name,
                pointAt: (cmd + ' ' + item.name).length,
              }));
              break;
            }
          }
        }
      }
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
        content: input.content.slice(0, input.pointAt) + e.key + input.content.slice(input.pointAt),
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
