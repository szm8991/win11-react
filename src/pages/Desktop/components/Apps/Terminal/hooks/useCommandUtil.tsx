import { useRef, useState } from 'react';
import { CommandNotFound, Help, NoSuchFileOrDirectory, Row } from '../components';
import { useCommandInput } from './useCommandInput';
import { useCommandRows } from './useCommandRows';
import { useFolderSystem } from './useFolderSystem';

type ControlKey =
  | 'Enter'
  | 'Backspace'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'
  | 'Home'
  | 'End'
  | 'Delete'
  | 'Ctrl_a'
  | 'Ctrl_c'
  | 'Ctrl_x'
  | 'Ctrl_v';

type CommandKey = 'clear' | 'help' | 'pwd' | 'cat' | 'ls' | 'cd' | 'mkdir' | 'touch';

export const useCommandUtil = () => {
  const userInput = useRef<HTMLSpanElement>(null);
  const { input, setInput, arrowLeft, arrowRight, backspace, del, clearInput } = useCommandInput();
  const { rows, generateRow, clearRows, addCommandHistory, getPreCommand, getNextCommand } = useCommandRows();
  const [alert, setAlert] = useState<boolean>(false);

  const isHighlight = useRef(false);

  const {
    currentFolderId,
    setCurrentFolderId,
    folderSystem,
    setFolderSystem,
    currentDirectory,
    setCurrentDirectory,
    path,
  } = useFolderSystem();

  const searchFile = (arg: string) => {
    const args = [arg, arg.toUpperCase(), arg.toLowerCase(), arg.charAt(0).toUpperCase() + arg.slice(1)];
    const childIds = folderSystem.get(`${currentFolderId}`)?.childIds;
    if (childIds)
      for (const item of folderSystem.entries()) {
        if (childIds.includes(item[1].id) && args.includes(item[1].name)) return item[1].id;
      }
  };

  const commandList: Record<CommandKey, (arg: string) => unknown> = {
    mkdir(arg = '') {
      const size = folderSystem.size;
      const newFolderSysteam = folderSystem.set(`${size}`, {
        id: size,
        name: arg,
        childIds: [],
        parentId: currentFolderId,
      });
      const childIds = folderSystem.get(`${currentFolderId}`)!.childIds;
      childIds && childIds.push(size);
      setFolderSystem(newFolderSysteam);
      generateRow(
        <>
          <Row pwd={currentDirectory} content={input.content} />
        </>,
      );
    },
    touch(arg = '') {
      const size = folderSystem.size;
      const newFolderSysteam = folderSystem.set(`${size}`, {
        id: size,
        name: arg,
        content: (
          <div>
            <h1>
              This is <span className="text-red-400 underline">{arg}</span> file!
            </h1>
            <p>Imaging there's a lot of content here...</p>
          </div>
        ),
        parentId: currentFolderId,
      });
      const childIds = folderSystem.get(`${currentFolderId}`)!.childIds;
      childIds && childIds.push(size);
      setFolderSystem(newFolderSysteam);
      generateRow(
        <>
          <Row pwd={currentDirectory} content={input.content} />
        </>,
      );
    },
    cd(arg = '') {
      const dir = currentDirectory;
      if (!arg || arg === '..') {
        // 处理文件路径
        const dirArr = dir.split('/');
        dirArr.length = Math.max(0, dirArr.length - 2);
        if (!dirArr.length) setCurrentDirectory(`${dirArr.join('')}`);
        else setCurrentDirectory(`${dirArr.join('')}/`);
        // 处理当前文件夹
        setCurrentFolderId(folderSystem.get(`${currentFolderId}`)?.parentId as number);
        return;
      }

      const id = searchFile(arg);
      // 如果子目录存在,设置路径、更新当前目录id
      if (id) {
        const res = `${dir}/${folderSystem.get(`${id}`)?.name}`;
        setCurrentFolderId(id);
        setCurrentDirectory(res);
        generateRow(
          <>
            <Row pwd={currentDirectory} content={input.content} />
          </>,
        );
      } else {
        generateRow(
          <>
            <Row pwd={currentDirectory} content={input.content} />
            <NoSuchFileOrDirectory command={arg} />
          </>,
        );
      }
    },
    ls() {
      let res: string[] = [];
      folderSystem.get(`${currentFolderId}`)?.childIds?.forEach((id) => {
        res.push(folderSystem.get(`${id}`)!.name);
      });
      if (res.length === 0) {
        generateRow(
          <>
            <Row pwd={currentDirectory} content={input.content} />
            <div>There are no other folders or files in the current directory.</div>
          </>,
        );
      } else {
        generateRow(<Row pwd={currentDirectory} content={input.content} />);
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
              <Row pwd={currentDirectory} content={input.content} />
              <div>{item.content}</div>
            </>,
          );
        }
      });
      if (!find)
        generateRow(
          <>
            <Row pwd={currentDirectory} content={input.content} />
            <div>{input.content}: 没有那个文件或目录</div>
          </>,
        );
    },
    pwd() {
      generateRow(
        <>
          <Row pwd={currentDirectory} content={input.content} />
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
          <Row pwd={currentDirectory} content={input.content} />
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
          <Row pwd={folderSystem.get(`${currentFolderId}`)!.name} content={input.content} />
          <CommandNotFound command={cmd} />
        </>,
      );
    addCommandHistory(input.content);
  };

  const controlKeyMap: Record<ControlKey, () => unknown> = {
    Ctrl_a: () => {
      if (input.content.length === 0) return;
      if (!isHighlight.current) {
        isHighlight.current = true;
        const str = userInput.current?.textContent;
        if (!str) return;
        const range = new Range();
        range.setStart(userInput.current!.firstChild!, 0);
        range.setEnd(userInput.current!.firstChild!, input.content.slice(0, input.pointAt).length);
        // 定义高亮
        const highlight = new Highlight(range);
        // 注册高亮
        CSS.highlights.set('terminal-select-all-highlight', highlight);
      } else {
        isHighlight.current = false;
        // 取消高亮
        CSS.highlights.delete('terminal-select-all-highlight');
      }
    },
    Ctrl_c: async () => {
      if (!isHighlight.current) return;
      try {
        await navigator.clipboard.writeText(input.content);

        isHighlight.current = false;
        CSS.highlights.delete('terminal-select-all-highlight');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    Ctrl_x: async () => {
      if (!isHighlight.current) return;
      try {
        await navigator.clipboard.writeText(input.content);

        isHighlight.current = false;
        CSS.highlights.delete('terminal-select-all-highlight');
        clearInput();
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    Ctrl_v: async () => {
      const text = await navigator.clipboard.readText();
      if (text.length === 0) return;
      setInput((input) => ({
        ...input,
        content: input.content.slice(0, input.pointAt) + text + input.content.slice(input.pointAt),
        pointAt: input.pointAt + text.length,
      }));
    },
    Enter: () => {
      if (input.content.trim().length !== 0) executeCommand();
      clearInput();
    },
    ArrowLeft: arrowLeft,
    ArrowRight: arrowRight,
    Backspace: backspace,
    Delete: del,
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
    Home: () => {
      setInput((input) => ({
        ...input,
        pointAt: 0,
      }));
    },
    End: () => {
      setInput((input) => ({
        ...input,
        pointAt: input.content.length,
      }));
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
    if (e.ctrlKey && /[a-zA-Z]/.test(e.key)) {
      controlKeyMap[`Ctrl_${e.key}` as ControlKey]?.();
    } else if (controlKeyMap[e.key as ControlKey]) {
      controlKeyMap[e.key as ControlKey]();
    }
  };

  return {
    userInput,
    rows,
    input,
    alert,
    setAlert,
    textCharHandler,
    controlCharHandler,
    path,
  };
};
