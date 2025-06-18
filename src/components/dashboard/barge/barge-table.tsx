"use client";

import RouterLink from "next/link";
import dayjs from "dayjs";
import { Box, Typography, Link, Divider, Card, Tooltip, IconButton } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { JSX, useMemo, ChangeEvent } from "react";
import { PencilSimple as EditIcon } from "@phosphor-icons/react";
import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from "@mui/material";
import { Trash as DeleteIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSelection } from "@/hooks/use-selection";
import { Barge } from "@/types/barge";
import { http } from "@/http";

interface BargeTableProps {
	count: number;
	page: number;
	rows: Barge[];
	rowsPerPage?: number;
	onPageChange: (event: unknown, newPage: number) => void;
	onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function BargeTable({
	count,
	rows,
	page,
	rowsPerPage = 0,
	onPageChange,
	onRowsPerPageChange,
}: BargeTableProps): JSX.Element {
	const rowIds = useMemo(() => rows.map((customer) => customer.id), [rows]);
	const [selectId, setSelectId] = useState<string | null>(null);
	const router = useRouter();

	const { selected } = useSelection(rowIds);

	return (
		<Card>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: "800px" }}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Water Status</TableCell>
							<TableCell>Distance Km</TableCell>
							<TableCell>Ready Date</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row: Barge) => {
							const isSelected = selected?.has(row.id);

							return (
								<TableRow hover key={row.id} selected={isSelected}>
									<TableCell>
										<Box component={RouterLink} href={`barges/${row.id}`}>
											<Link>
												<Typography variant="subtitle2">{row.name}</Typography>
											</Link>
										</Box>
									</TableCell>
									<TableCell>{row.waterStatus}</TableCell>
									<TableCell>{row.distanceKm} KM</TableCell>
									<TableCell>{dayjs(row.readyDatetime).format("MMM D, YYYY")}</TableCell>
									<TableCell sx={{ width: "80px", padding: "0 8px" }}>
										<Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
											{/* <IconButton size="small" href={`barges/${row.id}/edit`} sx={{ padding: 0.5 }}>
												<EditIcon size={24} />
											</IconButton> */}
											<IconButton size="small" sx={{ padding: 0.5 }} onClick={() => setSelectId(row.id)}>
												<DeleteIcon size={24} color="red" />
											</IconButton>
										</Box>
									</TableCell>
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
			<Dialog open={selectId !== null} onClose={() => setSelectId(null)}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>Are you sure you want to delete {selectId}?</DialogContent>
				<DialogActions>
					<Button onClick={() => setSelectId(null)}>Cancel</Button>
					<Button
						color="error"
						onClick={() => {
							if (selectId) {
								http.delete(`barges/${selectId}`).then(() => {
									setSelectId(null);
									router.refresh();
								});
							}
						}}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}
