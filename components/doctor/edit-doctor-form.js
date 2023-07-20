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
import { specializations } from '@/lib/constants/specializations';
import { doctorValidationSchema } from '@/lib/schema/doctor-schema';

const EditDoctorForm = ({ doctor }) => {
	const router = useRouter();
	const resolver = yupResolver(doctorValidationSchema);
	const form = useForm({
		defaultValues: {
			name: doctor.name,
			specialization: doctor.specialization,
		},
		resolver,
	});

	async function onSubmit(data) {
		try {
			await axios.patch(`/api/doctor/${doctor.id}/edit`, data);
			form.setValue('mobile', data.mobile);
			form.setValue('specialization', data.specialization);
			toast({
				title: 'Doctor Updated. You may close this sheet',
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select Doctor's Specialization" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{specializations.map(_specialization => (
										<SelectItem value={_specialization} key={_specialization}>
											{_specialization.toLocaleUpperCase()}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Doctor&apos;s Specialization</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full my-2'
					type='submit'>
					Edit Doctor
				</Button>
			</form>
		</Form>
	);
};

export default EditDoctorForm;
