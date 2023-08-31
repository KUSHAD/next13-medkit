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
						<TableHead>Name</TableHead>
						<TableHead>Specialization</TableHead>
						<TableHead>Rate</TableHead>
						<TableHead>Changeable Rate</TableHead>
						<TableHead>Doctor&apos;s Rate</TableHead>
						<TableHead>Office&apos;s Rate</TableHead>
						<TableHead>Techinician&apos;s Rate</TableHead>
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
