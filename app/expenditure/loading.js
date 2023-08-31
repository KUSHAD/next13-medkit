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
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Expenditure Type</TableHead>
						<TableHead>Payee Name</TableHead>
						<TableHead>Payee Mobile number</TableHead>
						<TableHead>Amount Paid</TableHead>
						<TableHead>Mode of Payment</TableHead>
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
						<TableCell>
							<Skeleton className='h-4' />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default Loading;
