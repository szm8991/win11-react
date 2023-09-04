import { useEffect, useState } from 'react';

export const LazyComponent: React.FC<{ show: boolean; children: unknown }> = ({
  show,
  children,
}) => {
  const [loaded, setLoad] = useState(false);

  // console.log(show);

  useEffect(() => {
    if (show && !loaded) setLoad(true);
  }, [show, loaded]);

  return show || loaded ? <>{children}</> : null;
};
