'use client';

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
import ErrorContainer from '@/components/error-container';

const columns = [
	{
		accessorKey: 'procedureName',
		header: 'Procedure Name',
	},
	{
		accessorKey: 'treatment',
		header: 'Treatment',
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
	},
	{
		accessorKey: 'totalAmount',
		header: 'Total Amount',
	},
	{
		accessorKey: 'officeAmount',
		header: 'Office Amount',
	},
	{
		accessorKey: 'doctorAmount',
		header: 'Doctor Amount',
	},
	{
		accessorKey: 'technicianAmount',
		header: 'Technician Amount',
	},
	{
		id: 'isTrashed',
		header: 'Status',
		cell: ({ row }) => {
			const procedureSplit = row.original;

			return procedureSplit.isTrashed ? 'Trashed' : 'Active';
		},
	},
];

const PaymentSplitViewer = ({ data }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='rounded-md border'>
			{data.length === 0 ? (
				<ErrorContainer
					title='No Billed Appointments Found  in the  selected time period'
					desc='Bill some appointments then see their reports here'
				/>
			) : (
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
									<TableCell>
										{data.reduce((acc, value) => (acc += value.quantity), 0)}
									</TableCell>
									<TableCell>
										{data.reduce((acc, value) => (acc += value.totalAmount), 0)}
									</TableCell>
									<TableCell>
										{data.reduce(
											(acc, value) => (acc += value.officeAmount),
											0
										)}
									</TableCell>
									<TableCell>
										{data.reduce(
											(acc, value) => (acc += value.doctorAmount),
											0
										)}
									</TableCell>
									<TableCell>
										{data.reduce(
											(acc, value) => (acc += value.technicianAmount),
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
			)}
		</div>
	);
};

export default PaymentSplitViewer;
