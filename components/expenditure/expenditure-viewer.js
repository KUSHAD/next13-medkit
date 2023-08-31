'use client';

import { useState } from 'react';
import ErrorContainer from '@/components/error-container';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ExpenditureTableActions from '@/components/expenditure/expenditure-table-actions';

const columns = [
	{
		accessorKey: 'expenditureType.name',
		header: 'Expenditure Type',
	},
	{
		accessorKey: 'name',
		header: 'Payee Name',
	},
	{
		accessorKey: 'mobileNumber',
		header: 'Payee Mobile number',
	},
	{
		accessorKey: 'amount',
		header: 'Amount Paid',
	},
	{
		accessorKey: 'modeOfPayment',
		header: 'Mode of Payment',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const expenditure = row.original;
			return <ExpenditureTableActions expenditure={expenditure} />;
		},
	},
];

const ExpenditureViewer = ({ data }) => {
	const [columnFilters, setColumnFilters] = useState([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		state: {
			columnFilters,
		},
	});
	return data.length !== 0 ? (
		<div>
			<div className='flex row justify-between py-4'>
				<Input
					placeholder='Filter Payee Names...'
					value={table.getColumn('name')?.getFilterValue() ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm mx-2'
				/>
				<Input
					placeholder='Filter Payee Mobile Numbers...'
					value={table.getColumn('mobileNumber')?.getFilterValue() ?? ''}
					onChange={event =>
						table.getColumn('mobileNumber')?.setFilterValue(event.target.value)
					}
					className='max-w-sm mx-2'
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
		</div>
	) : (
		<ErrorContainer
			title='No Expenditure'
			desc='No Expenditure made for the day'
		/>
	);
};

export default ExpenditureViewer;
