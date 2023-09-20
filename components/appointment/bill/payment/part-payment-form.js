'use client';
import { partPaymentValidationSchema } from '@/lib/schema/appointment/part-payment-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';

const PartPaymentForm = ({ paymentID }) => {
	const { id } = useParams();
	const resolver = yupResolver(partPaymentValidationSchema);
	const router = useRouter();

	const form = useForm({
		resolver,
		defaultValues: {
			amount: 0,
			dateOfPayment: new Date(),
		},
	});

	const onSubmit = async data => {
		try {
			await axios.post(`/api/part-payment`, {
				...data,
				paymentID,
				appointmentID: id,
			});
			toast({
				title: 'Added Part Payment',
			});
			router.refresh();
			form.reset();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='dateOfPayment'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Date of Payment</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											disabled={form.formState.isSubmitting}
											variant={'outline'}
											className={cn(
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Payment Date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										disabled={form.formState.isSubmitting}
										className='w-full'
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>Date of Payment</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Amount'
									{...field}
								/>
							</FormControl>
							<FormDescription>Amount Paid in this visit</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full my-2'
					type='submit'>
					Add Item
				</Button>
			</form>
		</Form>
	);
};

export default PartPaymentForm;
