'use client';

import { useCallback, useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

const DateRangePicker = ({ route }) => {
	const searchParams = useSearchParams();

	const router = useRouter();

	const [date, setDate] = useState({
		from: searchParams.get('from') || new Date(),
		to: searchParams.get('to') || addDays(new Date(), 1),
	});

	const handleDateChange = useCallback(
		_date => {
			let currentQuery = {};

			const urlFromDate = new Date(_date.from).toISOString();
			const urlToDate = new Date(_date.to).toISOString();

			const updatedQuery = {
				...currentQuery,
				from: urlFromDate,
				to: urlToDate,
			};

			setDate(_date);

			const url = qs.stringifyUrl(
				{
					url: route || '/',
					query: updatedQuery,
				},
				{ skipNull: true }
			);

			router.push(url);
			router.refresh();
		},
		[router, route]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id='date'
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal my-2',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, 'LLL dd, y')} -{' '}
								{format(date.to, 'LLL dd, y')}
							</>
						) : (
							format(date.from, 'LLL dd, y')
						)
					) : (
						<span>Choose Date Range</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					onSelect={handleDateChange}
					numberOfMonths={1}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DateRangePicker;
