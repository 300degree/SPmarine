import React from 'react'

type Tugboat = { no: number, name: string, maxLoad: number, maxBarge: number, maxLength: number };

type Props = {
    headers: string[];
    data: Record<string, Tugboat>[];
}

export default function Table({ headers, data }: Props) {
    return (
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-200">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border p-2 text-left">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border">
                        {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex} className="border p-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
