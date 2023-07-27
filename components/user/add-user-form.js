'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../ui/card';
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
import { userValidationSchema } from '@/lib/schema/user-schema';

const AddUserForm = () => {
	const router = useRouter();
	const resolver = yupResolver(userValidationSchema);
	const form = useForm({ resolver });

	async function onSubmit(data) {
		try {
			await axios.post('/api/user', data);
			form.setValue('mobile', '');
			form.setValue('name', '');
			toast({
				title: 'User Created',
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
