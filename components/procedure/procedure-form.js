'use client';

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
import { specializations } from '@/lib/constants/specializations';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '../ui/checkbox';

const ProcedureForm = ({ form, onSubmit }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Procedure Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									disabled={form.formState.isSubmitting}
									placeholder='Procedure Name'
									{...field}
								/>
							</FormControl>
							<FormDescription>Name of the Procedure</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='treatment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Treatment</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select Treatment' />
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
							</FormControl>
							<FormDescription>
								Procedure is for which Treatment
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='rate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rate</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Rate'
									{...field}
								/>
							</FormControl>
							<FormDescription>Rate of the Procedure</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='variableRate'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Changeable Rate</FormLabel>
								<FormDescription>
									Can the rate of the procedure change ?
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='doctorRate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Doctor&apos;s Rate</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Rate of the Doctor'
									{...field}
								/>
							</FormControl>
							<FormDescription>Rate of the Doctor</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isDoctorRatePercentageValue'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Doctor Rate Percentage</FormLabel>
								<FormDescription>
									Is The Doctor&apos;s Rate in Percentage
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='officeRate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Office&apos;s Rate</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Rate of the Office'
									{...field}
								/>
							</FormControl>
							<FormDescription>Rate of the Office</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isOfficeRatePercentageValue'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Office Rate Percentage</FormLabel>
								<FormDescription>
									Is The Office&apos;s Rate in Percentage
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='technicianRate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Technician&apos;s Rate</FormLabel>
							<FormControl>
								<Input
									type='tel'
									disabled={form.formState.isSubmitting}
									placeholder='Rate of the Technician'
									{...field}
								/>
							</FormControl>
							<FormDescription>Rate of the Technician</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isTechnicianRatePercentageValue'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Technician Rate Percentage</FormLabel>
								<FormDescription>
									Is The Technician&apos;s Rate in Percentage
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full my-2'
					type='submit'>
					Create Procedure
				</Button>
			</form>
		</Form>
	);
};

export default ProcedureForm;
