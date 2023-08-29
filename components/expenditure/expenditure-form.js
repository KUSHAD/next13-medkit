'use client';

import { Button } from '@/components/ui/button';

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
import { expenditureValidationSchema } from '@/lib/schema/expenditure-schema';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { modeOfPayment } from '@/lib/constants/mode-of-payment';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ExpenditureForm = ({ expenditureTypes }) => {
	const validationSchema = expenditureValidationSchema(expenditureTypes);
	const resolver = yupResolver(validationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			amount: expenditureTypes[0].amount,
			bankTransactionID: '',
			chequeNo: '',
			description: undefined,
			expenditureTypeId: expenditureTypes[0].id,
			issueDate: new Date(),
			mobileNumber: '',
			modeOfPayment: modeOfPayment[0],
			name: '',
			upiID: '',
		},
	});
	const router = useRouter();

	async function onSubmit(data) {
		try {
			await axios.post('/api/expenditure', data);
			form.reset();
			form.setValue('description', undefined);

			toast({
				title: 'Expenditure Created',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									disabled={form.formState.isSubmitting}
									placeholder='Name'
									{...field}
								/>
							</FormControl>
							<FormDescription>Name of the whom you are paying</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='mobileNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mobile Number</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Mobile number'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Mobile number of the whom you are paying
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issueDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Issue Date</FormLabel>
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
												<span>Issue Date</span>
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
							<FormDescription>Issue Date of the Expenditure</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='expenditureTypeId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expenditure Type</FormLabel>
							<Select
								onValueChange={value => {
									field.onChange(value);
									const selectedExpenditureType = expenditureTypes.find(
										_expenditureType => _expenditureType.id === value
									);
									form.setValue('amount', selectedExpenditureType.amount);
								}}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Expenditure Type' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<>
										<SelectItem value=''>Choose</SelectItem>
										{expenditureTypes.map(_expenditureType => (
											<SelectItem
												value={_expenditureType.id}
												key={_expenditureType.id}>
												{_expenditureType.name}
											</SelectItem>
										))}
									</>
								</SelectContent>
							</Select>
							<FormDescription>
								Type of the expenditure you are adding
							</FormDescription>
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
							<FormDescription>Amount you are paying</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='modeOfPayment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mode of Payment</FormLabel>
							<Select
								disabled={form.formState.isSubmitting}
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Mode of  Payment' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<>
										<SelectItem value=''>Choose</SelectItem>
										{modeOfPayment.map(_mode => (
											<SelectItem value={_mode} key={_mode}>
												{_mode.toLocaleUpperCase()}
											</SelectItem>
										))}
									</>
								</SelectContent>
							</Select>
							<FormDescription>Mode of Payment</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='chequeNo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cheque Number</FormLabel>
							<FormControl>
								<Input
									type='text'
									disabled={form.formState.isSubmitting}
									placeholder='Cheque Number'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Required if choosing Cheque as mode of payment
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='upiID'
					render={({ field }) => (
						<FormItem>
							<FormLabel>UPI ID</FormLabel>
							<FormControl>
								<Input
									type='text'
									disabled={form.formState.isSubmitting}
									placeholder='UPI  ID'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Required if choosing UPI as mode of payment
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bankTransactionID'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank Transaction ID</FormLabel>
							<FormControl>
								<Input
									type='text'
									disabled={form.formState.isSubmitting}
									placeholder='Bank Transaction ID'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Required if choosing Bank Transfer as mode of payment
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description of Expenditure</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none'
									placeholder='Description of Expenditure'
									type='text'
									disabled={form.formState.isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Describe the Expenditure (if any)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full my-2'
					type='submit'>
					Add Expenditure
				</Button>
			</form>
		</Form>
	);
};
export default ExpenditureForm;
