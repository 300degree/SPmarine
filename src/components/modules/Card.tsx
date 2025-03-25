import React, { JSX } from 'react';
import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props): JSX.Element {
  return (
    <div className={clsx('w-full bg-white rounded-lg p-py', className)}>
      {children}
    </div>
  );
}
