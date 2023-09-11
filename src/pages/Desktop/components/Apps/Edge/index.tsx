import { Icon } from '@/components/Icon';
import { LazyComponent } from '@/shared/lazy';
import { useAppState } from '@/stores/appState/useState';
import { useState } from 'react';
import { Sizebar } from '../components/Sizebar';
import './index.scss';

export const Edge: React.FC<NonNullable<unknown>> = props => {
  const appState = useAppState('Edge');
  const [url, setUrl] = useState('https://www.google.com/?igu=1');
  return (
    <div
      className="floatApp edgeBrowser"
      style={{ zIndex: appState.zIndex }}
      data-hidden={appState.hidden}
      data-size={appState.size}
    >
      <Toolbar size={appState.size} />
      <Addressbar url={url} />
      <Bookmarkbar />
      <LazyComponent show={!appState.hidden}>
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
          <div>Google</div>
          <Icon src="close" invert width={12} className="h-full"></Icon>
        </div>
      </div>
      <Sizebar controllApp="Edge" size={props.size} />
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
          className="text-[14px] w-full h-6 px-4"
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

const Bookmarkbar: React.FC<NonNullable<unknown>> = props => {
  const iframes: Record<string, string> = {
    'https://www.google.com/webhp?igu=1': 'Google',
    'https://bing.com': 'Bing',
    'https://www.youtube.com/embed/m0EHSoZzHEA': 'Youtube',
    'https://blueedge.me': 'blueedge',
    'https://andrewstech.me': '\nandrewstech',
    'https://blueedge.me/unescape': 'Unescape',
    'https://win11.blueedge.me': 'Inception',
    'https://open.spotify.com/embed/user/jhfivkgdtg4s97pwbo1rbvr9v/playlist/6IdR78TOog83PV4XhLDvWN':
      'Spotify',
    'https://bluelab.blueedge.me': 'BlueLab',
    'https://othello.blueedge.me': 'Othello',
  };
  const favicons: Record<string, string> = {
    'https://andrewstech.me': 'https://avatars.githubusercontent.com/u/45342431',
  };
  return (
    <div className="w-full bookbar py-2">
      <div className="flex">
        {Object.keys(iframes).map((mark, i) => {
          return (
            <div key={i} className="flex handcr items-center ml-2 mr-1 prtclk">
              <Icon
                className="mr-1"
                width={16}
                invert={false}
                src={
                  iframes[mark][0] != '\n' ? new URL(mark).origin + '/favicon.ico' : favicons[mark]
                }
              />
              <div className="text-xs">{iframes[mark].trim()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
