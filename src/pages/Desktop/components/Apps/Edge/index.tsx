import { Icon } from '@/components/Icon';
import { useEffect, useState } from 'react';
import './index.scss';

export const Edge: React.FC<{ hidden: boolean; size: 'full' | 'mini'; zIndex: number }> = props => {
  return (
    <div
      className="floatApp edgeBrowser"
      id="edgeApp"
      style={{ zIndex: props.zIndex }}
      data-hidden={props.hidden}
    >
      <div className="toolbar">
        <div className="flex flex-grow items-center">123</div>
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
      <div className="addressBar w-full h-10 flex items-center"></div>
      <iframe
        src={'https://www.google.com/webhp?igu=1'}
        id="isite"
        className="w-full h-full border-0"
        title="site"
      ></iframe>
    </div>
  );
};
export const LazyComponent: React.FC<{ show: boolean; children: React.FC }> = ({
  show,
  children,
}) => {
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    if (show && !loaded) setLoad(true);
  }, [show, loaded]);

  return show || loaded ? <>{children}</> : null;
};
