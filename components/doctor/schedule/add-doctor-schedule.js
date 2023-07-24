'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
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
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { days } from '@/lib/constants/days';
import { slots } from '@/lib/constants/slots';
import { scheduleValidationSchema } from '@/lib/schema/schedule-schema';

const AddDoctorSchedule = ({ doctorID }) => {
	const router = useRouter();
	const resolver = yupResolver(scheduleValidationSchema);
	const form = useForm({
		defaultValues: {
			slot: slots[0],
			day: 'MONDAY',
		},
		resolver,
	});

	async function onSubmit(data) {
		try {
			const { data: resData } = await axios.post(
				`/api/doctor/${doctorID}/schedule`,
				data
			);

			toast({
				title: 'Doctor Schedule added',
			});
			form.reset();
			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		}
	}

	return (
		<>
			<Card className='my-2 px-4 py-4'>
				<CardHeader>
					<CardTitle>Add Schedule</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='day'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Day</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Doctor's Day" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{days.map(_day => (
													<SelectItem value={_day} key={_day}>
														{_day.toLocaleUpperCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Doctor&apos;s Preferred Day
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='slot'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slot</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Doctor's Slot" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{slots.map(_slot => (
													<SelectItem value={_slot} key={_slot}>
														{_slot.toLocaleUpperCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Doctor&apos;s Preferred slot
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={form.formState.isSubmitting}
								className='w-full my-2'
								type='submit'>
								Add Schedule
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
};

export default AddDoctorSchedule;
