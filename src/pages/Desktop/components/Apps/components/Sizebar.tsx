import { Icon } from '@/components/Icon';
import { type Apps } from '@/stores/appState/state';
import { useUpdateActive, useUpdateOpen, useUpdateSize } from '@/stores/appState/useState';
import './Sizebar.scss';
export const Sizebar: React.FC<{
  controllApp: Apps;
  size: 'full' | 'mini';
  className?: string;
}> = props => {
  const activeUpdater = useUpdateActive();
  const openUpdater = useUpdateOpen();
  const sizeUpdater = useUpdateSize();
  console.log(props.size);
  return (
    <>
      <div
        className={`flex flex-shrink-0 w-full h-7 justify-between items-center relative rounded-md${
          props.className ?? ''
        }`}
      >
        <div className="flex flex-grow items-center h-full"></div>
        <div className="flex items-center h-full">
          <Icon
            src="minimize"
            invert
            width={12}
            className="px-4 h-full s-icon"
            onClick={() => activeUpdater(props.controllApp)}
          ></Icon>
          <Icon
            src={props.size == 'full' ? 'maximize' : 'maxmin'}
            invert
            width={12}
            className="px-4 h-full s-icon"
            onClick={() => sizeUpdater(props.controllApp)}
          ></Icon>
          <Icon
            src="close"
            invert
            width={12}
            className="px-4 h-full s-icon"
            onClick={() => openUpdater(props.controllApp)}
          ></Icon>
        </div>
      </div>
    </>
  );
};
