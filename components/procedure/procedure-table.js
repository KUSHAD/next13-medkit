'use client';

import { useState } from 'react';
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
import ProcedureTableActions from '@/components/procedure/procedure-table-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const columns = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'treatment',
		header: 'Treatment',
	},
	{
		accessorKey: 'rate',
		header: 'Rate',
	},
	{
		accessorKey: 'variableRate',
		header: 'Changeable Rate',
		cell: ({ row }) => {
			const procedure = row.original;
			return procedure.variableRate ? 'Yes' : 'No';
		},
	},
	{
		accessorKey: 'doctorRate',
		header: "Doctor's Rate",
		cell: ({ row }) => {
			const procedure = row.original;
			return procedure.isDoctorRatePercentageValue
				? `${procedure.doctorRate}%`
				: `Rs. ${procedure.doctorRate}`;
		},
	},
	{
		accessorKey: 'officeRate',
		header: "Office's Rate",
		cell: ({ row }) => {
			const procedure = row.original;
			return procedure.isOfficeRatePercentageValue
				? `${procedure.officeRate}%`
				: `Rs. ${procedure.officeRate}`;
		},
	},
	{
		accessorKey: 'technicianRate',
		header: "Techinician's Rate",
		cell: ({ row }) => {
			const procedure = row.original;
			return procedure.isTechnicianRatePercentageValue
				? `${procedure.technicianRate}%`
				: `Rs. ${procedure.technicianRate}`;
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const procedure = row.original;
			return <ProcedureTableActions procedure={procedure} />;
		},
	},
];

const ProcedureTable = ({ data }) => {
	const [columnFilters, setColumnFilters] = useState([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});
	return (
		<div>
			<div className='flex row justify-between py-4'>
				<Input
					placeholder='Filter Procedure Names...'
					value={table.getColumn('name')?.getFilterValue() ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
				/>
			</div>
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
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className='max-w-[100px] w-full'>
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
		</div>
	);
};

export default ProcedureTable;
