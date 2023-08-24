import { Icon } from '@/components/Icon';
import { LazyComponent } from '@/shared/lazy';
import { useState } from 'react';
import './index.scss';

export const Edge: React.FC<{ hidden: boolean; size: 'full' | 'mini'; zIndex: number }> = props => {
  const [url, setUrl] = useState('https://www.google.com/?igu=1');
  return (
    <div
      className="floatApp edgeBrowser"
      id="edgeApp"
      style={{ zIndex: props.zIndex }}
      data-hidden={props.hidden}
    >
      <Toolbar size={props.size} />
      <Addressbar url={url} />
      <LazyComponent show={!props.hidden}>
        <iframe src={url} id="isite" className="w-full h-full border-0" title="site"></iframe>
      </LazyComponent>
    </div>
  );
};

const Toolbar: React.FC<{ size: 'full' | 'mini' }> = props => {
  return (
    <>
      <div className="overTool flex h-[26px]">
        <Icon src="edge" width={14} invert={false} />
        <div className="btab">
          <div>New Tab</div>
          <Icon src="close" invert width={12} className="h-full"></Icon>
        </div>
      </div>
      <div className="toolbar">
        <div className="flex flex-grow items-center h-full"></div>
        <div className="flex items-center h-full">
          <Icon src="minimize" invert width={12} className="px-4 h-full"></Icon>
          <Icon
            src={props.size == 'full' ? 'maximize' : 'maxmin'}
            invert
            width={12}
            className="px-4 h-full"
          ></Icon>
          <Icon src="close" invert width={12} className="px-4 h-full"></Icon>
        </div>
      </div>
    </>
  );
};

const Addressbar: React.FC<{ url: string }> = props => {
  const typing: React.ChangeEventHandler<HTMLInputElement> = e => {
    console.log(e.target.value);
  };
  return (
    <div className="addressBar w-full h-10 flex items-center">
      <Icon src="left" width={14} invert className="px-1 h-full" />
      <Icon src="right" width={14} invert className="px-1 h-full" />
      <Icon src="refresh" width={14} invert className="px-1 h-full" />
      <Icon icon="Home" invert className="px-1 h-full" />
      <div className="addCont relative flex items-center">
        <input
          className="w-full h-6 px-4"
          placeholder="Type url or a query to search"
          type="text"
          value={props.url}
          onChange={typing}
        />
        <Icon src="google" width={14} invert={false} />
      </div>
    </div>
  );
};
