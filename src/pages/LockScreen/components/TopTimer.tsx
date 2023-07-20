export const TopTimer: React.FC<{ login: boolean }> = props => {
  return (
    <>
      <div
        className="mt-40 flex items-center flex-col transition-all data-[login=true]:opacity-0 data-[login=true]:pointer-events-none data-[login=true]:-translate-y-48"
        data-login={props.login}
      >
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </>
  );
};
