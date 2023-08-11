'use client';

import ErrorContainer from '../error-container';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Button } from '../ui/button';
import AttendanceTableActions from './attendance-table-actions';

const columns = [
	{
		accessorKey: 'doctor.name',
		header: 'Doctor Name',
	},
	{
		id: 'attendance',
		header: 'Attendance',
		cell: () => 'Present',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const attendance = row.original;
			return <AttendanceTableActions attendance={attendance} />;
		},
	},
];

const AttendanceViewer = ({ data }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});
	return data.length !== 0 ? (
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
					{table.getRowModel().rows.map(row => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
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
	) : (
		<ErrorContainer
			title='No Attendance'
			desc='No Attendance made for the day'
		/>
	);
};

export default AttendanceViewer;
