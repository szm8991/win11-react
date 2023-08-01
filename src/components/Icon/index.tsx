import * as Icons from '@/shared/icons';

type iconType = keyof typeof Icons;

export const Icon: React.FC<{
  src?: string;
  width?: number;
  invert: boolean;
  icon?: iconType;
}> = props => {
  if (props.src) {
    const src = `imgs/icon/${props.src}.png`;
    return (
      <div className="mx-2 relative grid place-items-center ">
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
      <div className="mx-2 relative grid place-items-center ">
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
