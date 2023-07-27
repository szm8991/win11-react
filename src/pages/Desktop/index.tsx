import { useTheme } from '@/hooks/useTheme';
import { Background } from './components/Background';
import { Taskbar } from './components/Taskbar';
import './index.scss';
export const Desktop: React.FC<NonNullable<unknown>> = () => {
  const theme = useTheme();
  return (
    <div className="wrapper" data-theme={theme}>
      <Background />
      <div className="desktop">desktopAPP</div>
      <Taskbar />
    </div>
  );
};
