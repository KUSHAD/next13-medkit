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

const validationSchema = yup.object({
	mobile: yup
		.string()
		.required('Mobile Required')
		.length(10, 'Must be 10 digits')
		.transform(_value => (isNaN(_value) ? undefined : _value))
		.typeError('Mobile number should be all digits'),
	name: yup
		.string()
		.required('Name Required')
		.min(3, 'Minimum 3 Characters for name')
		.max(25, 'Maximum 25 characters for name'),
});

const AddUserForm = () => {
	const router = useRouter();
	const resolver = yupResolver(validationSchema);
	const form = useForm({ resolver });

	async function onSubmit(data) {
		try {
			await axios.post('/api/user', data);
			toast({
				title: 'User Created',
			});
			form.reset();
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
									<FormDescription>User&apos;s Mobile Number </FormDescription>
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
									<FormDescription>Name of the user</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={form.formState.isSubmitting}
							className='w-full my-2'
							type='submit'>
							Create User
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default AddUserForm;
