'use client';

import { useCallback, useEffect, useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import PartPaymentTableActions from './part-payment-table-actions';

const columns = [
	{
		id: 'dateOfPayment',
		header: 'Date of Payment',
		cell: ({ row }) => {
			const partPayment = row.original;
			const date = new Date(partPayment.dateOfPayment).toLocaleDateString();
			return date;
		},
	},
	{
		accessorKey: 'amount',
		header: 'Ammount',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const partPayment = row.original;
			return <PartPaymentTableActions partPayment={partPayment} />;
		},
	},
];

const PartPaymentDisplay = ({ data }) => {
	const [total, setTotal] = useState(0);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const getTotal = useCallback(() => {
		const _total = data.reduce((acc, _data) => acc + _data.amount, 0);

		setTotal(_total);
	}, [data]);

	useEffect(() => {
		getTotal();
	}, [getTotal]);

	return (
		<div className='rounded-md border my-2'>
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
								<TableCell>Ammount Paid</TableCell>
								<TableCell>{total}</TableCell>
							</TableRow>
						</>
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default PartPaymentDisplay;
