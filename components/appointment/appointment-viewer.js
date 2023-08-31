'use client';

import ErrorContainer from '@/components/error-container';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import AppointmentTableActions from '@/components/appointment/appointment-table-actions';
const columns = [
	{
		accessorKey: 'name',
		header: 'Patient Name',
	},
	{
		accessorKey: 'mobile',
		header: 'Patient Mobile Number',
	},
	{
		accessorKey: 'doctor.name',
		header: 'Doctor Name',
	},
	{
		accessorKey: 'slot',
		header: 'Slot',
	},
	{
		accessorKey: 'problemType',
		header: 'Problem Type',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const appointment = row.original;
			return <AppointmentTableActions appointment={appointment} />;
		},
	},
];

const AppointmentViewer = ({ data }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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
			title='No Appointments'
			desc='No Appointments scheduled for the day'
		/>
	);
};

export default AppointmentViewer;
