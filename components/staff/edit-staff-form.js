'use client';

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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { staffValidationSchema } from '@/lib/schema/staff-schema';

const EditStaffForm = ({ staff }) => {
	const router = useRouter();
	const resolver = yupResolver(staffValidationSchema);
	const form = useForm({
		defaultValues: {
			name: staff.name,
			mobile: staff.mobileNumber,
		},
		resolver,
	});

	async function onSubmit(data) {
		try {
			await axios.patch(`/api/staff/${staff.id}/edit`, data);
			form.setValue('mobile', data.mobile);
			form.setValue('name', data.name);
			toast({
				title: 'Staff Updated. You may close this sheet',
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
					Edit Staff
				</Button>
			</form>
		</Form>
	);
};

export default EditStaffForm;
