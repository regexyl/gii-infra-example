import { Link as GeistLink } from '@geist-ui/core';
import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  children: React.ReactNode
}

const CustomLink: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <GeistLink color>{children}</GeistLink>
    </Link>
  );
};

export default CustomLink;
