import { clsx } from 'clsx';
import { JSX } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextfieldProps = {
  className?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  readonly?: boolean;
};

export default function Textfield({
  className,
  placeholder,
  type = 'text',
  register,
  readonly = false,
}: TextfieldProps): JSX.Element {
  return (
    <input
      type={type}
      placeholder={placeholder}
      readOnly={readonly}
      {...register}
      className={clsx(
        !readonly && 'border border-neutral-500',
        'p-2 w-full rounded-xl focus:outline-none h-fit',
        className,
      )}
    />
  );
}
