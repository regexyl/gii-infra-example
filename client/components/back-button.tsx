import { ArrowLeft } from '@geist-ui/icons';
import React from 'react';
import { CustomLink } from '.';

interface Props {
  href: string;
  overrideStyle?: string;
}

const BackButton: React.FC<Props> = ({ href, overrideStyle }) => {
  return (
    <CustomLink href={href}>
      <ArrowLeft className={overrideStyle ?? 'absolute top-16'} />
    </CustomLink>
  );
};

export default BackButton;
