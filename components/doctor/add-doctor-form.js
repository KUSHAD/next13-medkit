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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const addUserValidationSchema = yup.object({
	specialization: yup
		.string()
		.required('Specialization Required')
		.oneOf(['DENTAL', 'OPTICS']),
	name: yup
		.string()
		.required('Name Required')
		.min(3, 'Minimum 3 Characters for name')
		.max(25, 'Maximum 25 characters for name'),
});

const AddDoctorForm = () => {
	const router = useRouter();
	const resolver = yupResolver(addUserValidationSchema);
	const form = useForm({ resolver });

	async function onSubmit(data) {
		try {
			await axios.post('/api/doctor', data);
			form.setValue('specialization', '');
			form.setValue('name', '');
			toast({
				title: 'Doctor Created',
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
									<FormDescription>Doctor&apos;s name</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='specialization'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Specialization</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Doctor's Specialization" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value=''></SelectItem>
											<SelectItem value='DENTAL'>Dental </SelectItem>
											<SelectItem value='OPTICS'>Optics</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Doctor&apos;s Specialization
									</FormDescription>
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

export default AddDoctorForm;
