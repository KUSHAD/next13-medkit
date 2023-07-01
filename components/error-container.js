'use client';

import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

const ErrorContainer = ({
	title = 'Error',
	desc = 'There was some error',
	showReset = false,
	onClick,
	btnText = 'Retry',
}) => {
	return (
		<Card className='px-4 py-2'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{desc}</CardDescription>
			</CardContent>
			{showReset && (
				<CardFooter>
					<Button className='w-full' variant='secondary' onClick={onClick}>
						{btnText}
					</Button>
				</CardFooter>
			)}
		</Card>
	);
};

export default ErrorContainer;
