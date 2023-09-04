import './index.scss';
export const Terminal: React.FC<{
  hidden: boolean;
  size: 'full' | 'mini';
  zIndex: number;
}> = props => {
  return (
    <div
      className="floatApp winTerminal"
      style={{ zIndex: props.zIndex }}
      data-hidden={props.hidden}
    >
      terminal
    </div>
  );
};
