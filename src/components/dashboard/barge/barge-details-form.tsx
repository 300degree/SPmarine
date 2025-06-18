"use client";

import { Card, CardHeader, CardContent } from "@mui/material";
import { Divider, InputAdornment, TextField } from "@mui/material";
import { JSX, useContext, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";

import { BargeContext, BargeContextType } from "@/contexts/barge-context";

interface Props {
	id: string;
}

export function BargeDetailsForm({ id }: Props): JSX.Element {
	const { selectedBarge, getById } = useContext<BargeContextType>(BargeContext);

	useEffect(() => {
		if (id && getById) getById(id);
	}, [id, getById]);

	return (
		<form>
			<Card>
				<CardHeader subheader="ข้อมูลรายละเอียดเพิ่มเติม" title="รายละเอียดเรือลากจูง" />
				<Divider />

				<CardContent>
					<Grid container spacing={3}>
						{/* Id */}
						<Grid md={6} xs={12}>
							<TextField
								label="Id"
								type="text"
								value={selectedBarge?.id}
								name="id"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Name */}
						<Grid md={6} xs={12}>
							<TextField
								label="Name"
								type="text"
								value={selectedBarge?.name}
								name="name"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Weight */}
						<Grid md={6} xs={12}>
							<TextField
								label="Weight"
								type="text"
								value={selectedBarge?.weight}
								name="weight"
								InputLabelProps={{ shrink: true }}
								fullWidth
								InputProps={{
									endAdornment: <InputAdornment position="end">กิโลกรัม</InputAdornment>,
								}}
							/>
						</Grid>

						{/* Capacity */}
						<Grid md={6} xs={12}>
							<TextField
								label="Capacity"
								type="text"
								value={selectedBarge?.capacity}
								name="capacity"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Station Id */}
						<Grid md={6} xs={12}>
							<TextField
								label="Station Id"
								type="text"
								value={selectedBarge?.stationId}
								name="stationId"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>

						{/* Water Status */}
						<Grid md={6} xs={12}>
							<TextField
								label="WaterStatus"
								type="text"
								value={selectedBarge?.waterStatus}
								name="waterStatus"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
							/>
						</Grid>

						{/* Latitude & Longitude */}
						<Grid container>
							<Grid md={6} xs={12}>
								<TextField
									label="Longitude"
									type="text"
									value={selectedBarge?.longitude}
									name="longitude"
									InputLabelProps={{ shrink: true }}
									fullWidth
								/>
							</Grid>
							<Grid md={6} xs={12}>
								<TextField
									label="Latitude"
									type="text"
									value={selectedBarge?.latitude}
									name="latitude"
									InputLabelProps={{ shrink: true }}
									fullWidth
								/>
							</Grid>
						</Grid>

						{/* DistanceKm */}
						<Grid md={6} xs={12}>
							<TextField
								label="Distance Km"
								type="text"
								value={selectedBarge?.distanceKm}
								name="distanceKm"
								InputLabelProps={{ shrink: true }}
								fullWidth
								InputProps={{
									endAdornment: <InputAdornment position="end">กิโลเมตร</InputAdornment>,
								}}
							/>
						</Grid>

						{/* SetupTime */}
						<Grid>
							<TextField
								label="Setup Time"
								type="text"
								value={selectedBarge?.setupTime}
								name="setupTime"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* ReadyDateTime	 */}
						<Grid>
							<TextField
								label="Ready DateTime"
								type="datetime-local"
								value={dayjs(selectedBarge?.readyDatetime).format("YYYY-MM-DDTHH:mm")}
								name="readyDatetime"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</form>
	);
}
