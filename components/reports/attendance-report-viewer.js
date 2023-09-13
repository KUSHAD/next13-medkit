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
		accessorKey: 'doctorName',
		header: 'Doctor Name',
	},
	{
		id: 'presentOn',
		header: 'Present On',
		cell: ({ row }) => {
			const attendance = row.original;
			return attendance.presentOn.join(', ');
		},
	},

	{
		id: 'daysPresent',
		header: 'Days Present',
		cell: ({ row }) => {
			const attendance = row.original;
			return `${attendance.presentOn.length} day(s)`;
		},
	},
];

const AttendanceReportViewer = ({ data }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='rounded-md border'>
			{data.length === 0 ? (
				<ErrorContainer
					title='No Attendance Found  in the  selected time period'
					desc='Add Some Attendances then see their reports here'
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

export default AttendanceReportViewer;
