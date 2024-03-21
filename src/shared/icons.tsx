export const TaskSearchIcon: React.FC<{ className: string; style: { width: number } }> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 26 26" height="28" width="28">
      <circle cx="13" cy="11" r="8" fill="#ffffff24"></circle>
      <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
        <circle cx="13" cy="11" r="8"></circle>
        <path d="M3 21l4-4" strokeLinecap="round"></path>
      </g>
    </svg>
  );
};
export const upArrow: React.FC<{ className: string; style: { width: number } }> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="10" width="10">
      <path
        fill="currentColor"
        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
      ></path>
    </svg>
  );
};
export const Home: React.FC<{ className: string; style: { width: number } }> = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height="18"
      width="18"
    >
      <path
        fill="currentColor"
        d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
      ></path>
    </svg>
  );
};
