import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className='h-4 w-[200px]' />
				</CardTitle>
			</CardHeader>
			<CardDescription>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
				<div className='flex flex-row w-full my-2'>
					<Skeleton className='h-4 w-[200px] mr-2' />
					<Skeleton className='h-4 w-[200px]' />
				</div>
			</CardDescription>
		</Card>
	);
};
export default Loading;
