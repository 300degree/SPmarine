import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};
export function CustomTable({ children, className }: Props) {
  return (
    <table
      className={clsx('w-full border-separate border-spacing-y-3', className)}
    >
      {children}
    </table>
  );
}
export function CustomTh({ children, className }: Props) {
  return (
    <th
      className={clsx('px-4 py-2 bg-white h-8 text-left max-w-20', className)}
    >
      {children}
    </th>
  );
}

export function CustomTd({ children, className }: Props) {
  return (
    <td className={clsx('px-4 py-2 bg-white h-8 max-w-10', className)}>
      {children}
    </td>
  );
}
