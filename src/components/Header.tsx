import { JSX } from 'react';

export default function Header(): JSX.Element {
  return (
    <div className="w-full flex">
      <div className="w-48 bg-white h-14 flex items-center">logo</div>
      <div className="w-full bg-gray-700 h-14 shadow-sm" />
    </div>
  );
}
