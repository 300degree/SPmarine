import { clsx } from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextfieldProps = {
  className?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
};

export default function Textfield({
  className,
  placeholder,
  type = 'text',
  register,
}: TextfieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className={clsx(
        'border border-neutral-500 p-2 w-full rounded-xl focus:outline-none',
        className,
      )}
    />
  );
}
