'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { expenditureTypeValidationSchema } from '@/lib/schema/expenditure-type-schema';

const AddExpenditureTypeForm = () => {
	const router = useRouter();
	const resolver = yupResolver(expenditureTypeValidationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			amount: 0,
			name: '',
		},
	});

	async function onSubmit(data) {
		try {
			await axios.post('/api/expenditure-type', data);
			form.reset();
			toast({
				title: 'Expenditure Type Created',
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
		<Card className='mt-4'>
			<CardContent className='p-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Expenditure Type Name</FormLabel>
									<FormControl>
										<Input
											type='text'
											disabled={form.formState.isSubmitting}
											placeholder='Expenditure Type Name'
											{...field}
										/>
									</FormControl>
									<FormDescription>Expenditure Type Name</FormDescription>
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
									<FormDescription>Default Amount Of The Type</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={form.formState.isSubmitting}
							className='w-full my-2'
							type='submit'>
							Create Expenditure Type
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
export default AddExpenditureTypeForm;
