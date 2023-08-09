'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentValidationSchema } from '@/lib/schema/payment-schema';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

const MakePayment = ({ show, total }) => {
	const { id } = useParams();
	const router = useRouter();
	const resolver = yupResolver(paymentValidationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			dateOfPayment: new Date(),
			partPaymentEnabled: false,
		},
		values: {
			total,
		},
	});

	const watchPartPayment = form.watch('partPaymentEnabled');

	const onSubmit = data => {
		watchPartPayment ? enablePartPayment(data) : makePayment(data);
	};

	const makePayment = async data => {
		try {
			await axios.post('/api/payment', {
				...data,
				appointmentID: id,
			});

			toast({
				title: 'Appointment has been billed',
			});

			router.push('/appointment');
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	};

	const enablePartPayment = async data => {
		try {
			await axios.post('/api/payment/enable-part-payment', {
				...data,
				appointmentID: id,
			});

			toast({
				title: 'Part Payment Enabled',
			});

			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	};

	return (
		show && (
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
						name='partPaymentEnabled'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Enable Part Payment</FormLabel>
									<FormDescription>Enable Part Payment </FormDescription>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={form.formState.isSubmitting}
						className='w-full my-2'
						type='submit'>
						{watchPartPayment
							? 'Continue with part payment ?'
							: 'Continue with payment ?'}
					</Button>
				</form>
			</Form>
		)
	);
};

export default MakePayment;
