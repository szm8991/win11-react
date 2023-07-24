import './index.scss';
export const UserLogin: React.FC<{ login: boolean }> = props => {
  return (
    <div
      className="absolute z-10 top-1/4 flex flex-col items-center opacity-0 translate-y-16 pointer-events-none transition-all data-[login=false]:opacity-100 data-[login=false]:pointer-events-auto data-[login=false]:translate-y-0"
      data-login={!props.login}
    >
      <img className="rounded-full overflow-hidden w-52" src="imgs/asset/user.jpg" />
      <div className="mt-2 text-2xl font-medium text-gray-200">{'小明同学'}</div>
      <div className="flex items-center mt-6 signInBtn">Sign in</div>
    </div>
  );
};
