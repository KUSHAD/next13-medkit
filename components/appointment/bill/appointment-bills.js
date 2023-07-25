'use client';

import { useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
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
import AppointmentBillTableActions from './appointment-bill-table-actions';
import ErrorContainer from '@/components/error-container';

const columns = [
	{
		accessorKey: 'procedure.name',
		header: 'Procedure Name',
	},
	{
		accessorKey: 'finalValue',
		header: 'Rate',
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
	},
	{
		id: 'total',
		header: 'Total',
		cell: ({ row }) => {
			const bill = row.original;
			return bill.finalValue * bill.quantity;
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const bill = row.original;
			return <AppointmentBillTableActions bill={bill} />;
		},
	},
];

const AppointmentBills = ({ data }) => {
	const [columnFilters, setColumnFilters] = useState([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return data.length === 0 ? (
		<ErrorContainer title='No Bill Items' desc='No Items set for billing' />
	) : (
		<div>
			<div className='flex row justify-between py-4'>
				<Input
					placeholder='Filter Names...'
					value={table.getColumn('procedure.name')?.getFilterValue() ?? ''}
					onChange={event =>
						table
							.getColumn('procedure.name')
							?.setFilterValue(event.target.value)
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
							<>
								{table.getRowModel().rows.map(row => (
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
								))}

								<TableRow>
									<TableCell>Total</TableCell>
									<TableCell />
									<TableCell />
									<TableCell>
										{data.reduce(
											(acc, _data) => acc + _data.finalValue * _data.quantity,
											0
										)}
									</TableCell>
								</TableRow>
							</>
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
			</div>
		</div>
	);
};

export default AppointmentBills;
