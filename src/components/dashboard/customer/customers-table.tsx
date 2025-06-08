"use client";

import { JSX, useMemo } from "react";
import { Avatar, Box, Card, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";

import { useSelection } from "@/hooks/use-selection";
import { Customer } from "@/types/customer";

interface CustomersTableProps {
	count?: number;
	page?: number;
	rows?: Customer[];
	rowsPerPage?: number;
	onPageChange: (event: unknown, newPage: number) => void;
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomeAvatar({ id }: { id: string }) {
	const getInit = (str: string) => {
		if (!str) return "?";
		return str.slice(0, 2).toUpperCase();
	};
	return <Avatar>{getInit(id)}</Avatar>;
}

export function CustomersTable({
	count = 0,
	rows = [],
	page = 0,
	rowsPerPage = 0,
	onPageChange,
	onRowsPerPageChange,
}: CustomersTableProps): JSX.Element {
	const rowIds = useMemo(() => {
		return rows.map((customer) => customer.id);
	}, [rows]);

	const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

	const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
	const selectedAll = rows.length > 0 && selected?.size === rows.length;

	return (
		<Card>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: "800px" }}>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedAll}
									indeterminate={selectedSome}
									onChange={(event) => {
										event.target.checked ? selectAll() : deselectAll();
									}}
								/>
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Address</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => {
							const isSelected = selected?.has(row.id);

							return (
								<TableRow hover key={row.id} selected={isSelected}>
									<TableCell padding="checkbox">
										<Checkbox
											checked={isSelected}
											onChange={(event) => {
												event.target.checked ? selectOne(row.id) : deselectOne(row.id);
											}}
										/>
									</TableCell>
									<TableCell>
										<Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
											<CustomeAvatar id={row.id} />
											<Typography variant="subtitle2">{row.name}</Typography>
										</Stack>
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.address}</TableCell>
									{/* <TableCell>
										{row.address.city}, {row.address.state}, {row.address.country}
									</TableCell> */}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
			<Divider />
			<TablePagination
				component="div"
				count={count}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
}