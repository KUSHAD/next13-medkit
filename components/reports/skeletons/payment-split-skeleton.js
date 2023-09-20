import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const PaymentSplitSkeleton = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Procedure Name</TableHead>
					<TableHead>Treatment</TableHead>
					<TableHead>Quantity</TableHead>
					<TableHead>Total Amount</TableHead>
					<TableHead>Office Amount</TableHead>
					<TableHead>Doctor Amount</TableHead>
					<TableHead>Technician Amount</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};
export default PaymentSplitSkeleton;
