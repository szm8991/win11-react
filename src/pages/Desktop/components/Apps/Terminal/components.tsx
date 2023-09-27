export const CommandNotFound: React.FC<{ command: string }> = ({ command }) => {
  return (
    <>
      <div className="flex w-full h-6">
        <span className="mr-2">
          zsh: command not found: <span>{command}</span>
        </span>
      </div>
    </>
  );
};
export const Row: React.FC<{ content: string }> = props => {
  return <div className="w-full whitespace-pre">{`ming# ${props.content}`}</div>;
};
