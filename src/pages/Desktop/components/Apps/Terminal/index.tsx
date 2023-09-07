import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Sizebar } from '../components/Sizebar';
import './index.scss';
export const Terminal: React.FC<{
  hidden: boolean;
  size: 'full' | 'mini';
  zIndex: number;
}> = props => {
  const [content, setContent] = useState<string>('');
  // const commandRef = useRef<HTMLInputElement>(null);
  const keyHandler = useDebounce((e: KeyboardEvent) => {
    // if (!set.has(e.key)) e.preventDefault();
    if (e.key == 'Enter') {
      console.log('exec command');
      setContent('');
    } else setContent(content => content + e.key);
  }, 16);
  const controlHandler = useDebounce((e: KeyboardEvent) => {
    if (e.key == 'Backspace') {
      setContent(content => content.slice(0, -1));
    }
  }, 16);
  useEffect(() => {
    document.addEventListener('keypress', keyHandler);
    // document.addEventListener('keydown', controlHandler);
    return () => {
      document.removeEventListener('keypress', keyHandler);
      // document.removeEventListener('keydown', controlHandler);
    };
  });
  return (
    <div
      className="floatApp winTerminal"
      style={{ zIndex: props.zIndex }}
      data-hidden={props.hidden}
    >
      <Toolbar />
      <div
        className="flex flex-col p-4 pr-[5px] h-full text-white bg-[#1C1C1E]/95 rounded-lg"
        style={{ fontFamily: 'Menlo, monospace', fontSize: '14px' }}
      >
        <div className="flex flex-col flex-1 w-full mt-6 mb-2 overflow-y-scroll scrollbar">
          <div>Welcome to Terminal,type `help` to get started,have fun!</div>
          <div className="flex-1 w-full">
            ming#
            <span className="typing"> {content}</span>
            {/* <input type="text" className="hidden" ref={commandRef} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const Toolbar: React.FC<NonNullable<unknown>> = props => {
  return (
    <div className="absolute w-full top-2 bg-transparent">
      <div className="absolute w-auto flex space-x-2 ml-1 ">
        <div className="bg-red-500 w-[13px] h-[13px] mt-2 rounded-full ml-1"> </div>
        <div className="bg-yellow-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
        <div className="bg-green-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
      </div>
      <Sizebar controllApp="Terminal" size="full" className="mt-2 h-full" />
    </div>
  );
};
