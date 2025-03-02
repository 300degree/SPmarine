import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routers } from '../common/constants/routes';
import { plansAsync, plansSelector } from '../common/store/slices/plansSlice';
import { useAppDispatch } from '../common/store/store';
import { PlansResponse } from '../common/types';
import { CustomTable, CustomTd, CustomTh } from '../components/CustomTable';
import DraggableTableCell from '../components/modules/DraggableTableCell';
import Pagination from '../components/modules/Pagination';
import SearchBar from '../components/modules/SearchBar';

type Props = {};
export default function PlanPage({}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;
  const plansReducer = useSelector(plansSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(plansAsync());
  }, [dispatch]);

  if (plansReducer.isPending || !plansReducer.result) return 'Loading...';
  const totalPages = Math.ceil(plansReducer.result.length / itemsPerPage);
  const paginatedData = plansReducer.result.slice(
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
              count={plansReducer.result.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <TableBody data={paginatedData} />
    </div>
  );
}

function TableBody({ data }: { data: PlansResponse[] }) {
  const navigate = useNavigate();
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
            <tr
              key={item.id}
              className="bg-white"
              onClick={() => navigate(`/${routers.plan}/${item.id}`)}
            >
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
