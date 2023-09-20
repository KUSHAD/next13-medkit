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
		accessorKey: 'expenditureType',
		header: 'Expediture Type',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
	{
		id: 'isTrashed',
		header: 'Status',
		cell: ({ row }) => {
			const expeditureSum = row.original;

			return expeditureSum.isTrashed ? 'Trashed' : 'Active';
		},
	},
];

const ExpeditureSumViewer = ({ data }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='rounded-md border'>
			{data.length === 0 ? (
				<ErrorContainer
					title='No Expenditures Found  in the  selected time period'
					desc='Add Some expeditures then see their reports here'
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
									<TableCell>
										{data.reduce((acc, value) => (acc += value.amount), 0)}
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

export default ExpeditureSumViewer;
