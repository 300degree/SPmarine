import { Search } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full mx-auto flex bg-white rounded-lg shadow-md pl-2.5">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full p-2 pr-10 rounded-xl focus:outline-none text-sm"
        />
        <Search className="absolute right-3 top-2 text-gray-500" size={20} />
      </div>
    </div>
  );
}
