import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
	Option,
	Input,
	Button,
	Typography,
} from '@material-tailwind/react';

export default function ReportConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<Dialog open={open} handler={onClose} size="xl">
			<DialogHeader>Configure Reports</DialogHeader>

			<DialogBody className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
				{/* Row 1 */}
				<div>
					<Typography variant="small" color="blue-gray">
						Performance by
					</Typography>
					<Select label="Choose agent">
						<Option>Agent</Option>
					</Select>
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Data Source
					</Typography>
					<Select label="Flown" disabled>
						<Option>Flown</Option>
					</Select>
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Parameters
					</Typography>
					<Select label="Revenue">
						<Option>Revenue</Option>
					</Select>
				</div>

				{/* Row 2 */}
				<div>
					<Typography variant="small" color="blue-gray">
						Currency
					</Typography>
					<Select label="USD">
						<Option>USD</Option>
					</Select>
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Sale Period
					</Typography>
					<Select label="Previous FY (2013-14)">
						<Option>Previous FY (2013-14)</Option>
					</Select>
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Period From
					</Typography>
					<Input type="month" defaultValue="2013-04" crossOrigin={undefined} />
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Period To
					</Typography>
					<Input type="month" defaultValue="2014-03" crossOrigin={undefined} />
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Travel Period
					</Typography>
					<Select label="Custom Period">
						<Option>Custom Period</Option>
					</Select>
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Period From
					</Typography>
					<Input type="month" defaultValue="2014-04" crossOrigin={undefined} />
				</div>

				<div>
					<Typography variant="small" color="blue-gray">
						Period To
					</Typography>
					<Input type="month" defaultValue="2015-03" crossOrigin={undefined} />
				</div>
			</DialogBody>

			<DialogFooter>
				<Button variant="text" color="gray" onClick={onClose} className="mr-2">
					<span>Cancel</span>
				</Button>
				<Button variant="filled" color="blue" onClick={() => alert('Report Applied!')}>
					<span>Apply</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
