import { useDebounce } from '@/hooks/useDebounce';
import { useAppState } from '@/stores/appState/useState';
import { useEffect, useRef } from 'react';
import { Sizebar } from '../components/Sizebar';
import { useCommandUtil } from './hooks/useCommandUtil';
import './index.scss';

export const Terminal: React.FC<NonNullable<unknown>> = props => {
  const appState = useAppState('Terminal');
  const archor = useRef<HTMLSpanElement>(null);
  const { rows, input, textCharHandler, controlCharHandler } = useCommandUtil();
  const textHandler = useDebounce(textCharHandler, 16);
  const controlHandler = useDebounce(controlCharHandler, 16);
  // console.log(input.content, input.pointAt);
  useEffect(() => {
    archor.current?.scrollIntoView();
    document.addEventListener('keypress', textHandler);
    document.addEventListener('keydown', controlHandler);
    return () => {
      document.removeEventListener('keypress', textHandler);
      document.removeEventListener('keydown', controlHandler);
    };
  });
  // console.log(rows);
  return (
    <div
      className="floatApp winTerminal"
      style={{ zIndex: appState.zIndex }}
      data-hidden={appState.hidden}
      data-size={appState.size}
    >
      <Toolbar size={appState.size} />
      <div
        className="flex flex-col p-4 pr-[5px] h-full text-white bg-[#1C1C1E]/95 rounded-lg"
        style={{ fontFamily: 'Menlo, monospace', fontSize: '14px' }}
      >
        <div className="flex flex-col flex-1 w-full mt-6 mb-2 overflow-y-scroll scrollbar">
          <div>Welcome to Terminal,type `help` to get started,have fun!</div>
          {...rows}
          <div className="w-full">
            {`ming# ${input.content.slice(0, input.pointAt)}`}
            <span className="typing" ref={archor}></span>
            {input.content.slice(input.pointAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Toolbar: React.FC<{ size: 'full' | 'mini' }> = props => {
  return (
    <div className="absolute w-full top-2 bg-transparent h-6">
      <div className="absolute w-auto flex space-x-2 ml-1 ">
        <div className="bg-red-500 w-[13px] h-[13px] mt-2 rounded-full ml-1"> </div>
        <div className="bg-yellow-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
        <div className="bg-green-500 w-[13px] h-[13px] mt-2 rounded-full "></div>
      </div>
      <Sizebar controllApp="Terminal" size={props.size} className="mt-2 h-full" />
    </div>
  );
};
