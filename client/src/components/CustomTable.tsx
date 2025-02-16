import React from 'react'

type Props = {
    children: React.ReactNode
}

export function CustomTable({ children }: Props) {
    return (
        <table className='w-full border-separate border-spacing-y-3'>
            {children}
        </table>
    )
}

export function CustomTh({ children }: Props) {
    return (
        <th className='px-4 py-2 bg-white h-8 text-left max-w-20'>
            {children}
        </th>
    )
}

export function CustomTd({ children }: Props) {
    return (
        <td className='px-4 py-2 bg-white h-8 max-w-10'>
            {children}
        </td>
    )
}