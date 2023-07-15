'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../ui/card';
import * as yup from 'yup';
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
import { staffValidationSchema } from '@/lib/schema/staff-schema';

const AddStaffForm = () => {
	const router = useRouter();
	const resolver = yupResolver(staffValidationSchema);
	const form = useForm({ resolver });

	async function onSubmit(data) {
		try {
			await axios.post('/api/staff', data);
			form.setValue('mobile', '');
			form.setValue('name', '');
			toast({
				title: 'Staff Created',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: error.response.data.message,
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
							name='mobile'
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
									<FormDescription>Staff&apos;s Mobile Number </FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
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
									<FormDescription>Name of the Staff</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={form.formState.isSubmitting}
							className='w-full my-2'
							type='submit'>
							Create Staff
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default AddStaffForm;
