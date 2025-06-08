"use client";

import axios from "axios";
import { Button, Stack, Typography } from "@mui/material";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { JSX, useState, ChangeEvent } from "react";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";

// import { CustomersFilters } from "@/components/dashboard/customer/customers-filters";
import { CustomersTable } from "@/components/dashboard/customer/customers-table";
import { Customer } from "@/types/customer";
import { useCustomer } from "@/hooks/use-customer";

export default function Page(): JSX.Element {
	const [file, setFile] = useState<File | null>(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const customers: Customer[] = useCustomer();
	const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

	const handleImport = async () => {
		if (!file) return;

		const formdata = new FormData();
		formdata.append("file", file);

		try {
			const res = await axios.post("order/upload", formdata, { headers: { "Content-Type": "multipart/form-data" } });
			console.log(res);
		} catch (e) {
			console.error(e);
		}
	};

	const handleExport = () => {};

	const handlePageChange = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Stack spacing={3}>
			<Stack direction="row" spacing={3}>
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Customers</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
						<Button
							color="inherit"
							startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
							onClick={handleImport}
						>
							Import
						</Button>
						<Button
							color="inherit"
							startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
							onClick={handleExport}
						>
							Export
						</Button>
					</Stack>
				</Stack>
				<div>
					<Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
						Add
					</Button>
				</div>
			</Stack>
			{/* <CustomersFilters /> */}
			<CustomersTable
				count={customers.length}
				page={page}
				rows={paginatedCustomers}
				rowsPerPage={rowsPerPage}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
			/>
		</Stack>
	);
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
	return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
