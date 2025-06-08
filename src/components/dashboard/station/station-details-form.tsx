"use client";

import { Button, Divider, FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import { Card, CardHeader, CardContent, CardActions, MenuItem } from "@mui/material";
import { JSX, useContext, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { TugboatContext, TugboatContextType } from "@/contexts/tugboat-context";
import { StationContext, StationContextType } from "@/contexts/station-context";

interface Props {
	id: string;
}

export function StationDetailsForm({ id }: Props): JSX.Element {
	// const { selectedTugboat, getById } = useContext<TugboatContextType>(TugboatContext);
	const { selected, getById } = useContext<StationContextType>(StationContext);

	useEffect(() => {
		if (id && getById) getById(id);
	}, [id, getById]);

	return (
		<form
		// onSubmit={(event) => {
		//   event.preventDefault();
		// }}
		>
			<Card>
				<CardHeader subheader="The information can be edited" title="edit tugboat" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						{/* Name */}
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>Name</InputLabel>
								<OutlinedInput value={selected?.name} label="Name" name="name" />
							</FormControl>
						</Grid>

						{/* Type */}
						<Grid md={6} xs={12}>
							<FormControl fullWidth>
								<InputLabel>Type</InputLabel>
								<Select value={selected?.type} label="Type" name="type" variant="outlined">
									<MenuItem value="SEA">SEA</MenuItem>
									<MenuItem value="RIVER">RIVER</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						{/* Latitude */}
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>Max Capacity</InputLabel>
								<OutlinedInput value={selected?.latitude} label="Max Capacity" name="latitude" />
							</FormControl>
						</Grid>

						{/* Longitude */}
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>Max Capacity</InputLabel>
								<OutlinedInput value={selected?.longitude} label="Max Capacity" name="longitude" />
							</FormControl>
						</Grid>

						{/* DistanceKm */}
						<Grid md={6} xs={12}>
							<FormControl fullWidth required>
								<InputLabel>DistanceKm</InputLabel>
								<OutlinedInput value={selected?.distanceKm} label="DistanceKm" name="distanceKm" />
							</FormControl>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: "flex-end" }}>
					<Button variant="contained">Save details</Button>
				</CardActions>
			</Card>
		</form>
	);
}