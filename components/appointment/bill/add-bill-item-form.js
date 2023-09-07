'use client';

import { toast } from '@/components/ui/use-toast';
import { billValidationSchema } from '@/lib/schema/appointment/bill-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
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
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import axios from 'axios';

const AddBillItemForm = ({ procedures }) => {
	const validationSchema = billValidationSchema(procedures);
	const resolver = yupResolver(validationSchema);
	const router = useRouter();

	const { id } = useParams();
	const searchParams = useSearchParams();

	const form = useForm({
		resolver,
		defaultValues: {
			procedureID: '',
			finalValue: 0,
			quantity: 0,
			valueDisabled: true,
		},
	});

	const inputDisabled = form.watch('valueDisabled');

	const onSubmit = async data => {
		try {
			await axios.post(`/api/appointment/${id}/bill`, {
				...data,
				type: searchParams.get('type'),
			});
			form.reset({
				procedureID: '',
				valueDisabled: true,
				quantity: 0,
				finalValue: 0,
			});
			toast({
				title: 'Item Added',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	};

	const increment = useCallback(() => {
		const value = form.getValues('quantity') + 1;
		form.setValue('quantity', value);
	}, [form]);

	const decrement = useCallback(() => {
		const value = form.getValues('quantity') - 1;
		form.setValue('quantity', value);
	}, [form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='procedureID'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Procedure Name</FormLabel>
							<Select
								onValueChange={value => {
									field.onChange(value);
									const selectedProcedure = procedures.find(
										_procedure => _procedure.id === value
									);
									form.setValue('finalValue', selectedProcedure.rate);
									form.setValue(
										'valueDisabled',
										!selectedProcedure.variableRate
									);
								}}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='User' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<>
										<SelectItem value=''>Choose</SelectItem>
										{procedures.map(_procedure => (
											<SelectItem value={_procedure.id} key={_procedure.id}>
												{_procedure.name}
											</SelectItem>
										))}
									</>
								</SelectContent>
							</Select>
							<FormDescription>Select Procedure</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<div className='flex flex-row'>
									<Button
										type='button'
										variant='outline'
										size='icon'
										className='mx-2'
										onClick={decrement}>
										<MinusIcon />
									</Button>
									<Input
										type='tel'
										disabled
										placeholder='quantity'
										{...field}
									/>
									<Button
										type='button'
										variant='outline'
										size='icon'
										className='mx-2'
										onClick={increment}>
										<PlusIcon />
									</Button>
								</div>
							</FormControl>
							<FormDescription>Quantity </FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='finalValue'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rate</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting || inputDisabled}
									placeholder='Rate'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Rate of the Procedure (Enabled if Changeable Rate)
							</FormDescription>
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

export default AddBillItemForm;
