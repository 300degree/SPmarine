"use client";

import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import { Button, Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import { Barge } from "@/types/barge";
import { http } from "@/http";
import { paths } from "@/paths";

export default function Page() {
	const { register, handleSubmit } = useForm<Barge>();
	const router = useRouter();

	const onSubmit = handleSubmit(async (val) => {
		try {
			await http.post("barges", val);

			router.replace(paths.dashboard.barges);
		} catch (e) {
			console.error("Error creating barge:", e);
		}
	});

	return (
		<form onSubmit={onSubmit}>
			<Card>
				<CardHeader title="เพิ่มข้อมูลเรือบรรทุก" subheader="คุณสามารถเพิ่มข้อมูลได้ที่นี่" />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						{/* Id */}
						<Grid md={6} xs={12}>
							<TextField
								label="ID"
								{...register("id", { required: "Id is required" })}
								type="text"
								placeholder="ID: SPI_001"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Name */}
						<Grid md={6} xs={12}>
							<TextField
								label="Name"
								{...register("name", { required: "name is requried" })}
								type="text"
								placeholder="Name: SPI_001"
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Weight */}
						<Grid md={6} xs={12}>
							<TextField
								label="Weight"
								type="number"
								InputLabelProps={{ shrink: true }}
								InputProps={{
									endAdornment: <InputAdornment position="end">กิโลกรัม</InputAdornment>,
								}}
								{...register("weight", { required: "Weight is required" })}
								fullWidth
							/>
						</Grid>

						{/* Capacity */}
						<Grid md={6} xs={12}>
							<TextField
								label="Capacity"
								type="number"
								{...register("capacity", { required: "capacity is required" })}
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Station Id */}
						<Grid md={6} xs={12}>
							<TextField
								label="Station Id"
								type="text"
								{...register("stationId", { required: "station_id is required" })}
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Latitude & Longitude */}
						<Grid container>
							<Grid md={6} xs={12}>
								<TextField
									label="Longitude"
									type="text"
									{...register("longitude", { required: "longitude is requried" })}
									InputLabelProps={{ shrink: true }}
									InputProps={{
										endAdornment: <InputAdornment position="end">องศา</InputAdornment>,
									}}
									fullWidth
								/>
							</Grid>
							<Grid md={6} xs={12}>
								<TextField
									label="Latitude"
									type="text"
									{...register("latitude", { required: "latitude is requried" })}
									InputLabelProps={{ shrink: true }}
									InputProps={{
										endAdornment: <InputAdornment position="end">องศา</InputAdornment>,
									}}
									fullWidth
								/>
							</Grid>
						</Grid>

						{/* DistanceKm */}
						<Grid md={6} xs={12}>
							<TextField
								label="Distance Km"
								{...register("distanceKm", { required: "distanceKm is requried" })}
								placeholder="e.g."
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
								type="number"
								{...register("setupTime", { required: "setupTime is required" })}
								InputLabelProps={{ shrink: true }}
								fullWidth
								InputProps={{
									endAdornment: <InputAdornment position="end">นาที</InputAdornment>,
								}}
							/>
						</Grid>

						{/* ReadyDateTime	 */}
						<Grid>
							<TextField
								label="Ready DateTime"
								type="datetime-local"
								{...register("readyDatetime", { required: "readyDateTime is requried" })}
								InputLabelProps={{ shrink: true }}
								fullWidth
							/>
						</Grid>

						{/* Water Status */}
						<Grid lg={2} md={6} xs={12}>
							<FormControl fullWidth>
								<InputLabel id="water-status-label">สถานะน้ำ</InputLabel>
								<Select
									labelId="water-status-label"
									id="water-status"
									label="Water Status"
									defaultValue=""
									{...register("waterStatus", { required: "Water status is required" })}
								>
									<MenuItem value="" disabled>
										-- กรุณาเลือกสถานะน้ำ --
									</MenuItem>
									{["SEA", "RIVER"].map((status: string, idx: number) => (
										<MenuItem key={idx} value={status}>
											{status}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: "flex-end" }}>
					<Button variant="contained" type="submit">
						Add new
					</Button>
				</CardActions>
			</Card>
		</form>
	);
}
