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
						<TableHead>Doctor Name</TableHead>
						<TableHead>Attendance</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[250px]' />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default Loading;
