'use client';

import { useEffect, useState, useCallback } from 'react';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from '@/components/ui/table';
import ErrorContainer from '@/components/error-container';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import DoctorScheduleTableAction from './doctor-schedule-table-actions';

const columns = [
	{
		accessorKey: 'day',
		header: 'Day',
	},
	{
		accessorKey: 'slot',
		header: 'Slot',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const schedule = row.original;
			return <DoctorScheduleTableAction schedule={schedule} />;
		},
	},
];

const DoctorScheduleTable = ({ doctorID, isTrashed = false }) => {
	const [schedule, setSchedule] = useState([]);
	const [loading, setLoading] = useState(true);

	const table = useReactTable({
		data: schedule,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const fetchSchedules = useCallback(async () => {
		try {
			const uri = isTrashed
				? `/api/doctor/${doctorID}/schedule/trashed`
				: `/api/doctor/${doctorID}/schedule`;
			const { data: resData } = await axios.get(uri);

			setSchedule(resData.schedule);
		} catch (error) {
			toast({
				title: error.response.data.message,
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	}, [doctorID, isTrashed]);

	useEffect(() => {
		fetchSchedules();
	}, [fetchSchedules]);

	return (
		<div>
			{loading ? (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Day</TableHead>
								<TableHead>Slot</TableHead>
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
						</TableBody>
					</Table>
				</div>
			) : schedule.length === 0 ? (
				<ErrorContainer
					title='No schedules found'
					desc='This Doctor has no Schedules'
				/>
			) : (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					<div className='flex items-center justify-end space-x-2 py-4'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorScheduleTable;
