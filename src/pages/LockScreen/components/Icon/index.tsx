export const Icon: React.FC<{ width: number; src: string; invert: boolean }> = props => {
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
};
