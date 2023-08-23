import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<>
			<h3 className='text-muted-primary text-lg'>Appointment Details</h3>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Patient Name</TableHead>
							<TableHead>Doctor Name</TableHead>
							<TableHead>Slot</TableHead>
							<TableHead>Problem Type</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<h2 className='text-lg text-muted-primary mt-2'>Billing</h2>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Procedure Name</TableHead>
							<TableHead>Rate</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<h2 className='text-lg text-muted-primary mt-2'>Payment</h2>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date of Payment </TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4' />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default Loading;
