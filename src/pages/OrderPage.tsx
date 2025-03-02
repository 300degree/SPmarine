import React, { useEffect, useState } from "react";
import axios from "axios";
import { CustomTable, CustomTd, CustomTh } from "../components/CustomTable";
import SearchBar from "../components/modules/SearchBar";
import Pagination from "../components/modules/Pagination";

type Order = {
    id: string;
    type: string;
    from: string;
    to: string;
    weight: number;
    start: string;
    due: string;
};

export default function OrderPage() {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 80;

    useEffect(() => {
        axios.get("https://67b098483fc4eef538e7db00.mockapi.io/api/OrderPage")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("ไม่สามารถดึงข้อมูลได้");
                setLoading(false);
            });
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center w-full pt-4">
                <div>
                    <h1 className="text-xl font-bold">Order Page</h1>
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
                        <CustomTh>NO.</CustomTh>
                        <CustomTh>Type</CustomTh>
                        <CustomTh>From</CustomTh>
                        <CustomTh>To</CustomTh>
                        <CustomTh>Weight</CustomTh>
                        <CustomTh>Start</CustomTh>
                        <CustomTh>Due</CustomTh>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((order) => (
                        <tr key={order.id} className="border">
                            <CustomTd>{order.id}</CustomTd>
                            <CustomTd>{order.type}</CustomTd>
                            <CustomTd>{order.from}</CustomTd>
                            <CustomTd>{order.to}</CustomTd>
                            <CustomTd>{order.weight}</CustomTd>
                            <CustomTd>{order.start}</CustomTd>
                            <CustomTd>{order.due}</CustomTd>
                        </tr>
                    ))}
                </tbody>
            </CustomTable>
        </div>
    );
}
