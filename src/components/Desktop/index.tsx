export const Desktop = () => {
  return (
    <>
      <div>
        <Background />
        <FooterMenu />
      </div>
    </>
  );
};

export const Background = () => {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(imgs/wallpaper/screen/default.jpg)`,
      }}
    ></div>
  );
};

export const FooterMenu = () => {
  return (
    <div
      className="min-w-full h-6 absolute bottom-0"
      style={{
        backgroundColor: 'rgba(242, 242, 242, 0.9)',
        backdropFilter: 'blur(20px)',
      }}
    ></div>
  );
};
