import axios from 'axios';
import SearchBar from '../components/modules/SearchBar';
import { useEffect, useState } from 'react';
import DraggableTableCell from '../components/modules/DraggableTableCell';
import Pagination from '../components/modules/Pagination';
import { useQuery } from '@tanstack/react-query';
import { CustomTable, CustomTd, CustomTh } from '../components/CustomTable';

type Props = {};

export default function PlanPage({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () =>
      (await axios.get('https://67b086673fc4eef538e7a359.mockapi.io/orders'))
        .data,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pt-4">
        <div>
          <h1 className="text-xl font-bold">Plans</h1>
          <button className="bg-red-300 py-1.5 px-3 rounded-lg text-white transition duration-300 hover:bg-red-400 cursor-pointer">
            New
          </button>
        </div>
        <div className="w-2/5 flex flex-col">
          <SearchBar />
          <div className="flex justify-end">
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
  );
}

export type Orders = {
  readonly order: string;
  readonly load: number;
  readonly assing_barge: Array<number | string>;
  readonly barge_load: Array<number | string>;
  readonly id: string;
};

function TabelBody({ data }: { data: Orders[] }) {
  const titles: string[] = [
    'NO.',
    'Orders',
    'Load',
    'Assign barge',
    'Barge load',
  ];

  return (
    <div className="max-h-195 overflow-auto mt-2 rounded-lg">
      <CustomTable>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <CustomTh
                key={index}
                className={`
                ${index === 0 && 'rounded-l-lg w-1'} 
                ${index === titles.length - 1 && 'rounded-r-lg'}`}
              >
                {title}
              </CustomTh>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="bg-white">
              <CustomTd className="max-w-0 rounded-l-lg">{index + 1}</CustomTd>
              <CustomTd>{item.order}</CustomTd>
              <CustomTd>{item.load}</CustomTd>
              <CustomTd>
                <DraggableTableCell data={item.assing_barge} />
              </CustomTd>
              <CustomTd className="rounded-r-lg">
                <DraggableTableCell data={item.barge_load} />
              </CustomTd>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </div>
  );
}
