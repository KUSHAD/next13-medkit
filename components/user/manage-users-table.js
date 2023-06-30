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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

const columns = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'mobileNumber',
		header: 'Mobile Number',
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const user = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost'>
							<span className='sr-only'>Actions</span>
							<DotsHorizontalIcon className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>
							<DropdownMenuLabel>Edit User Details</DropdownMenuLabel>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<DropdownMenuLabel className='text-destructive'>
								Move to Trash
							</DropdownMenuLabel>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const ManageUsersTable = ({ data }) => {
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
					placeholder='Filter Names...'
					value={table.getColumn('name')?.getFilterValue() ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm mx-2'
				/>
				<Input
					placeholder='Filter Mobile Numbers...'
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
		</div>
	);
};

export default ManageUsersTable;
