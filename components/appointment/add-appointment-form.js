'use client';

import { appointmentValidationSchema } from '@/lib/schema/appointment-schema';
import { Button } from '../ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
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
import { slots } from '@/lib/constants/slots';
import { specializations } from '@/lib/constants/specializations';
import { Textarea } from '../ui/textarea';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddAppointmentForm = ({ doctors, users }) => {
	const validationSchema = appointmentValidationSchema(doctors, users);
	const resolver = yupResolver(validationSchema);
	const form = useForm({ resolver });
	const router = useRouter();

	async function onSubmit(data) {
		try {
			await axios.post('/api/appointment', data);
			form.reset();
			toast({
				title: 'Appointment Booked',
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
			<Sheet>
				<SheetTrigger asChild>
					<Button>Book Appointment</Button>
				</SheetTrigger>
				<SheetContent side='right' className='overflow-y-auto'>
					<SheetHeader>
						<SheetTitle>Book Appointment</SheetTitle>
					</SheetHeader>
					<SheetDescription>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name='userID'
									render={({ field }) => (
										<FormItem>
											<FormLabel>User</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='User' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{users.map(_user => (
														<SelectItem value={_user.value} key={_user.value}>
															{_user.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>
												Who is the user you are booking appointment for ?
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
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
													{doctors.map(_doctor => (
														<SelectItem
															value={_doctor.value}
															key={_doctor.value}>
															{_doctor.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>
												Who is the preferred doctor ?
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='dateOfAppointment'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Date of Appointment</FormLabel>
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
																<span>Appointment Date</span>
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
											<FormDescription>Appointment Date </FormDescription>
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
												disabled={form.formState.isSubmitting}
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select Appointment Slot' />
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
											<FormDescription>Appointment Slot</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='problemType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Treatment</FormLabel>
											<Select
												disabled={form.formState.isSubmitting}
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select Treatment' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{specializations.map(_specialization => (
														<SelectItem
															value={_specialization}
															key={_specialization}>
															{_specialization.toLocaleUpperCase()}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormDescription>Treatment Type</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Address'
													className='resize-none'
													type='text'
													disabled={form.formState.isSubmitting}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Specify User&apos;s Address
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													className='resize-none'
													placeholder='Description'
													type='text'
													disabled={form.formState.isSubmitting}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Describe the problems faced by the patient
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting}
									className='w-full my-2'
									type='submit'>
									Create Appointment
								</Button>
							</form>
						</Form>
					</SheetDescription>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default AddAppointmentForm;
