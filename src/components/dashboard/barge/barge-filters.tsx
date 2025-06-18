import { JSX, ChangeEvent } from "react";
import { Card, InputAdornment, TextField } from "@mui/material";

import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

interface Props {
	val: string;
	cb: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function BargeFilters({ val, cb }: Props): JSX.Element {
	return (
		<Card sx={{ p: 2 }}>
			<TextField
				label="Search by Name"
				type="text"
				name="name"
				placeholder="e.g. 1234 or Barge01"
				value={val}
				onChange={cb}
				InputLabelProps={{ shrink: true }}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
						</InputAdornment>
					),
				}}
			/>
		</Card>
	);
}
