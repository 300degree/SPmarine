import {
	Card as C,
	CardHeader as CH,
	CardBody as CB,
	CardFooter as CF,
	Typography,
	CardFooter,
} from '@material-tailwind/react';
import { ReactNode } from 'react';

type CardProps = {
	labal: string;
	value: number;
	icon: ReactNode;
	footer: string;
};

export default function Card({ labal, value, icon, footer }: CardProps) {
	return (
		<C className="border border-blue-gray-100 shadow-sm">
			<CH
				variant="gradient"
				color="white"
				floated={false}
				shadow={false}
				children={icon}
				className="absolute grid h-12 w-12 place-items-center"
			/>
			<CB className="">
				<Typography variant="small" className="font-normal text-blue-gray-600" children={labal} />
				<Typography variant="h4" color="blue-gray" children={value} />
			</CB>
			{footer && <CardFooter className="border-t border-blue-gray-50 p-4" children={footer} />}
		</C>
	);
}
