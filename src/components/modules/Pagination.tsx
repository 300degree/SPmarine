import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  count: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  count,
}: Props) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, count)

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      <span className='text-gray-700'>
        {startIndex} - {endIndex} / {count}
      </span>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50'
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50'
      >
        <ChevronRight />
      </button>
    </div>
  )
}
