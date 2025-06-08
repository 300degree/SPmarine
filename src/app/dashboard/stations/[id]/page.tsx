import { JSX } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { StationDetailsForm } from "@/components/dashboard/station/station-details-form";

interface Props {
	params: { id: string };
}

export default function Page({ params }: Props): JSX.Element {
	return (
		<Grid lg={8} md={6} xs={12}>
			<StationDetailsForm id={params.id} />
		</Grid>
	);
}