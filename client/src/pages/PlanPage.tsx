import axios from 'axios'
import SearchBar from '../components/modules/SearchBar'
import { useEffect, useState } from 'react'
import DraggableTableCell from '../components/modules/DraggableTableCell'
import Pagination from '../components/modules/Pagination'

type Props = {}

export default function PlanPage({}: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 80
  const [data, setData] = useState<Orders[]>([])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        'https://67b086673fc4eef538e7a359.mockapi.io/orders'
      )
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center w-full pt-4'>
        <div>
          <h1 className='text-xl font-bold'>Plans</h1>
          <button className='bg-red-300 py-1.5 px-3 rounded-lg text-white transition duration-300 hover:bg-red-400 cursor-pointer'>
            New
          </button>
        </div>
        <div className='w-2/5 flex flex-col'>
          <SearchBar />
          <div className='flex justify-end'>
            <Pagination
              count={data.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <TabelBody data={paginatedData} />
    </div>
  )
}

export type Orders = {
  readonly order: string
  readonly load: number
  readonly assing_barge: Array<number | string>
  readonly barge_load: Array<number | string>
  readonly id: string
}

function TabelBody({ data }: { data: Orders[] }) {
  const titles: string[] = [
    'NO.',
    'Orders',
    'Load',
    'Assign barge',
    'Barge load',
  ]
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null)
  const handleRowClick = (item: Orders) => {
    setSelectedOrder(item)
  }

  return (
    <div className='max-h-195 overflow-auto mt-2 rounded-lg'>
      <table className='w-full border-separate border-spacing-y-3'>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th
                key={index}
                className={`px-4 py-2 bg-white h-8 text-left max-w-20
                ${index === 0 && 'rounded-l-lg w-1'} 
                ${index === titles.length - 1 && 'rounded-r-lg'}`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className='bg-white'
              onClick={() => handleRowClick(item)}
            >
              <td className='px-4 py-2 h-8 rounded-l-lg'>{index + 1}</td>
              <td className='px-4 py-2 h-8 max-w-10'>{item.order}</td>
              <td className='px-4 py-2 h-8 max-w-10'>{item.load}</td>
              <td className='px-4 py-2 h-8 max-w-10'>
                <DraggableTableCell data={item.assing_barge} />
              </td>
              <td className='px-4 py-2 h-8 max-w-10 rounded-r-lg'>
                <DraggableTableCell data={item.barge_load} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
