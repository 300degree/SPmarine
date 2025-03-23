import { useNavigate } from 'react-router-dom';
import { CustomTable, CustomTd, CustomTh } from '../components/CustomTable';
import SearchBar from '../components/modules/SearchBar';
import { routers, usePlans } from '../common';

export default function PlanPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pt-4">
        <div>
          <h1 className="text-xl font-bold">Plans</h1>
          <button
            className="bg-red-300 py-1.5 px-3 rounded-lg text-white transition duration-300 hover:bg-red-400 cursor-pointer"
            onClick={() => navigate(`/plan/new`)}
          >
            New
          </button>
        </div>
        <div className="w-2/5 flex flex-col">
          <SearchBar />
        </div>
      </div>
      <TableBody />
    </div>
  );
}

function TableBody() {
  const { data: plans, isLoading, isError } = usePlans();
  const navigate = useNavigate();
  const titles = ['NO.', 'Orders', 'Load', 'Assign barge', 'Barge load'];

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !plans) return <h1>Error loading data</h1>;

  return (
    <div className="max-h-195 overflow-auto mt-2 rounded-lg">
      <CustomTable>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <CustomTh
                key={index}
                className={`${index === 0 && 'rounded-l-lg w-1'} ${
                  index === titles.length - 1 && 'rounded-r-lg'
                }`}
              >
                {title}
              </CustomTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.map((item, index) => (
            <tr
              key={item.id}
              className="bg-white"
              onClick={() => navigate(`/${routers.plan}/${item.id}`)}
            >
              <CustomTd className="max-w-0 rounded-l-lg">{index + 1}</CustomTd>
              <CustomTd>{item.order}</CustomTd>
              <CustomTd>{item.load}</CustomTd>
              {/* <CustomTd>
                <DraggableTableCell data={item.assing_barge} />
              </CustomTd>
              <CustomTd className="rounded-r-lg">
                <DraggableTableCell data={item.barge_load} />
              </CustomTd> */}
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </div>
  );
}
