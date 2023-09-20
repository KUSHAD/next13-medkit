'use client';

import { Button } from '@/components/ui/button';
import {
	DialogTrigger,
	Dialog,
	DialogContent,
	DialogHeader,
} from '@/components/ui/dialog';
import { UploadButton } from '@uploadthing/react';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { appointmentTestValidationSchema } from '@/lib/schema/appointment/appointment-test-schema';

const AddAppointmentTest = ({ disabled }) => {
	const { id } = useParams();
	const router = useRouter();
	const [uploading, setUploading] = useState(false);
	const resolver = zodResolver(appointmentTestValidationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			description: '',
			showUploader: false,
			appointmentID: id,
		},
	});

	useEffect(() => {
		form.setValue('appointmentID', id);
	}, [id, form]);

	async function onSubmit() {
		form.setValue('showUploader', true);
	}

	const watchShowUploader = form.watch('showUploader');
	return (
		<div className='flex flex-row my-2'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button disabled={disabled}>Add Test Document</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Add Test Document</DialogHeader>
					<div className='my-4'>
						<strong>Progress</strong>
						<Progress value={watchShowUploader ? 100 : 50} />
					</div>
					{watchShowUploader ? (
						<>
							<UploadButton
								input={{
									description: form.getValues('description'),
									appointmentID: form.getValues('appointmentID'),
									showUploader: form.getValues('showUploader'),
								}}
								onUploadBegin={() => {
									setUploading(true);
								}}
								endpoint='appointmentTests'
								className='w-full ut-button:w-full ut-button:bg-primary ut-button:ut-readying:opacity-50 ut-button:ut-readying:cursor-not-allowed ut-uploading:ut-button:opacity-50 ut-uploading:ut-button:cursor-not-allowed '
								onClientUploadComplete={() => {
									setUploading(false);
									form.reset();
									toast({
										title: 'Added Test Document',
									});
									router.refresh();
								}}
								onUploadError={error => {
									toast({
										title: error.message,
										variant: 'destructive',
									});
									setUploading(false);
								}}
							/>
							<Button
								disabled={uploading}
								variant='destructive'
								onClick={() => form.setValue('showUploader', false)}>
								Go Back
							</Button>
						</>
					) : (
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description of the Test</FormLabel>
											<FormControl>
												<Textarea
													className='resize-none'
													placeholder='Description of the document'
													type='text'
													disabled={form.formState.isSubmitting || uploading}
													{...field}
												/>
											</FormControl>
											<FormDescription>Description of the Test</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting || uploading}
									className='w-full my-2'
									type='submit'>
									Add Test
								</Button>
							</form>
						</Form>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default AddAppointmentTest;
