'use client';

import { Button } from '@/components/ui/button';
import {
	DialogHeader,
	DialogTrigger,
	Dialog,
	DialogContent,
	DialogTitle,
} from '@/components/ui/dialog';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { attendanceValidationSchema } from '@/lib/schema/attendance-schema';

const AddAttendanceForm = ({ doctors }) => {
	const validationSchema = attendanceValidationSchema(doctors);
	const resolver = yupResolver(validationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			dateOfAttendance: new Date(),
			doctorID: '',
		},
	});
	const router = useRouter();

	async function onSubmit(data) {
		try {
			await axios.post('/api/attendance', data);
			form.reset();

			toast({
				title: 'Attendance Recorded',
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
		<div className='flex flex-row'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button>Add Attendance</Button>
				</DialogTrigger>
				<DialogContent className='overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>Add Attendance</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='doctorID'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Doctor</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Doctor' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<>
													<SelectItem value=''>Choose</SelectItem>
													{doctors.map(_doctor => (
														<SelectItem
															value={_doctor.value}
															key={_doctor.value}>
															{_doctor.label}
														</SelectItem>
													))}
												</>
											</SelectContent>
										</Select>
										<FormDescription>
											Which Doctor&apos;s Attendance are you marking ?
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='dateOfAttendance'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Date of Attendance</FormLabel>
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
															<span>Attendance Date</span>
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
										<FormDescription>Attendance Date </FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={form.formState.isSubmitting}
								className='w-full my-2'
								type='submit'>
								Add Attendance
							</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddAttendanceForm;
