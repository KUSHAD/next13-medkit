'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import qs from 'query-string';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

const AttendanceDatePicker = () => {
	const searchParams = useSearchParams();

	const router = useRouter();

	const [date, setDate] = useState(searchParams.get('date') || new Date());

	const handleDateChange = useCallback(
		_date => {
			let currentQuery = {};

			const urlDate = new Date(_date).toISOString();

			const updatedQuery = {
				...currentQuery,
				date: urlDate,
			};

			setDate(_date);

			const url = qs.stringifyUrl(
				{
					url: '/attendance',
					query: updatedQuery,
				},
				{ skipNull: true }
			);

			router.push(url);
			router.refresh();
		},
		[router]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={handleDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default AttendanceDatePicker;
