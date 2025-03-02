import React, { useRef, useState } from 'react';

type Props = {
  data: Array<number | string>;
};
export default function DraggableTableCell({ data }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {data.map((bl, index) => (
        <span key={index} className="bg-gray-200 px-2 py-1 rounded-md">
          {bl}
        </span>
      ))}
    </div>
  );
}
