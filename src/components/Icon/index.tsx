import * as Icons from '@/shared/icons';
import { MouseEventHandler } from 'react';
type iconType = keyof typeof Icons;

export const Icon: React.FC<{
  src?: string;
  width?: number;
  invert: boolean;
  icon?: iconType;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> = props => {
  if (props.src) {
    const src = `imgs/icon/${props.src}.png`;
    return (
      <div
        className={`${props.className ?? ''} uicon mx-1 relative grid place-items-center `}
        onClick={props.onClick ?? undefined}
      >
        <img
          className={props.invert ? 'invert' : ''}
          style={{
            width: props.width,
          }}
          src={src}
        />
      </div>
    );
  }
  if (props.icon) {
    const CustomIcon = Icons[props.icon];
    return (
      <div className={`${props.className ?? ''} uicon mx-1 relative grid place-items-center `}>
        <CustomIcon
          className={props.invert ? 'invert' : ''}
          style={{
            width: props.width!,
          }}
        />
      </div>
    );
  }
};
