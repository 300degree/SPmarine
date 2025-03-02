import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CustomTable, CustomTd, CustomTh } from '../components/CustomTable';
import SearchBar from '../components/modules/SearchBar';
import Pagination from '../components/modules/Pagination';

type Tugboat = {
  id: string;
  name: string;
  maxLoad: number;
  maxBarge: number;
  maxLength: number;
};
export default function TugboatPage() {
  const [data, setData] = useState<Tugboat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;

  useEffect(() => {
    axios
      .get('https://67b098483fc4eef538e7db00.mockapi.io/api/TugboatPage')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('ไม่สามารถดึงข้อมูลได้');
        setLoading(false);
      });
  }, []);
  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading)
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pt-4">
        <div>
          <h1 className="text-xl font-bold">Tugboat Page</h1>
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

      <CustomTable>
        <thead className="bg-gray-200">
          <tr>
            <CustomTh>ID</CustomTh>
            <CustomTh>Name</CustomTh>
            <CustomTh>Max Load (tons)</CustomTh>
            <CustomTh>Max Barge</CustomTh>
            <CustomTh>Max Length (m)</CustomTh>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((tugboat) => (
            <tr key={tugboat.id} className="border">
              <CustomTd>{tugboat.id}</CustomTd>
              <CustomTd>{tugboat.name}</CustomTd>
              <CustomTd>{tugboat.maxLoad}</CustomTd>
              <CustomTd>{tugboat.maxBarge}</CustomTd>
              <CustomTd>{tugboat.maxLength}</CustomTd>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </div>
  );
}
