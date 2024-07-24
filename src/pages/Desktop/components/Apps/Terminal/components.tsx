import { useFolderSystem } from './hooks/useFolderSystem';

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
export const Row: React.FC<{ content: string }> = (props) => {
  const { currentFolderId, folderSystem } = useFolderSystem();
  return (
    <div className="w-full whitespace-pre">{`ming:${folderSystem.get(`${currentFolderId}`)!.name} # ${props.content}`}</div>
  );
};

export function Help() {
  return (
    <ul key={Math.random().toString()} className="list-disc ml-6 pb-1.5">
      <li>
        <span className="text-purple-400">cat {'<file>'}</span> - See the content of {'<file>'}
      </li>
      <li>
        <span className="text-purple-400">cd {'<dir>'}</span> - Move into
        {' <dir>'}, "cd" or"cd .." to move to the parent directory, "cd ~" to return to root
      </li>
      <li>
        <span className="text-purple-400">ls</span> - See files and directories in the current directory
      </li>
      <li>
        <span className="text-purple-400">clear</span> - Clear the screen
      </li>
      <li>
        <span className="text-purple-400">help</span> - Display this help menu
      </li>
      <li>
        <span className="text-purple-400">mkdir</span> - create a folder
      </li>
      <li>
        <span className="text-purple-400">touch</span> - create a file
      </li>
      <li>
        press <span className="text-purple-400">up arrow / down arrow</span> - Select history commands
      </li>
      <li>
        press <span className="text-purple-400">tab</span> - Auto complete
      </li>
    </ul>
  );
}
