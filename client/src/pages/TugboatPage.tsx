import React from 'react'
import Table from "../components/Table";

type Props = {}

export default function TugboatPage({ }: Props) {
    const headers = ["No", "Name", "Max Load (ton)", "Max Barge (n)", "Max Barge Length (m)"];
    const tugboats = [
        { no: 1, name: "TBS01", maxLoad: 8000, maxBarge: 3, maxLength: 300 },
        { no: 2, name: "TBS02", maxLoad: 10000, maxBarge: 4, maxLength: 400 },
        { no: 3, name: "TBR01", maxLoad: 6000, maxBarge: 3, maxLength: 300 },
        { no: 3, name: "TBR02", maxLoad: 5000, maxBarge: 2, maxLength: 250 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tugboat Page</h1>
            <Table headers={headers} data={tugboats} />
        </div>
    );
}