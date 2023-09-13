import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
const Loading = () => {
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='expenditure-sum'>
				<AccordionTrigger>Expenditure</AccordionTrigger>
				<AccordionContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Expenditure Type</TableHead>
								<TableHead>Amount</TableHead>
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
							</TableRow>
							<TableRow>
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
							</TableRow>
							<TableRow>
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
							</TableRow>
						</TableBody>
					</Table>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='attendance'>
				<AccordionTrigger>Attendance</AccordionTrigger>
				<AccordionContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Doctor Name</TableHead>
								<TableHead>Present On</TableHead>
								<TableHead>Days Present</TableHead>
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
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
export default Loading;
