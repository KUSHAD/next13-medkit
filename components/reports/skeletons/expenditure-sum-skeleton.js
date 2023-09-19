import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ExpenditureSumSkeleton = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Expenditure Type</TableHead>
					<TableHead>Amount</TableHead>
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
				</TableRow>
			</TableBody>
		</Table>
	);
};
export default ExpenditureSumSkeleton;
