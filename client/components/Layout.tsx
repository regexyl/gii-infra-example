import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  customStyle?: string;
}

const Layout: React.FC<Props> = ({ children, customStyle }) => {
  // Default style
  const [style, setStyle] = useState('mx-20 my-10 flex flex-col');

  useEffect(() => {
    if (customStyle) setStyle(customStyle);
  });

  return <div className={style}>{children}</div>;
};

export default Layout;
