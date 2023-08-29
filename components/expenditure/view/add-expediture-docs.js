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
import { expenditureDocumentValidationSchema } from '@/lib/schema/expenditure-document-schema';
import { Progress } from '@/components/ui/progress';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AddExpeditureDocs = () => {
	const { id } = useParams();
	const router = useRouter();
	const resolver = zodResolver(expenditureDocumentValidationSchema);
	const form = useForm({
		resolver,
		defaultValues: {
			description: '',
			showUploader: false,
			expenditureID: id,
		},
	});

	useEffect(() => {
		form.setValue('expenditureID', id);
	}, [id, form]);

	async function onSubmit() {
		form.setValue('showUploader', true);
	}

	const watchShowUploader = form.watch('showUploader');
	return (
		<div className='flex flex-row'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button> Add Expediture Docs</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Add Expediture Docs</DialogHeader>
					<div className='my-4'>
						<strong>Progress</strong>
						<Progress value={watchShowUploader ? 100 : 50} />
					</div>
					{watchShowUploader ? (
						<>
							<UploadButton
								input={{
									description: form.getValues('description'),
									expenditureID: form.getValues('expenditureID'),
									showUploader: form.getValues('showUploader'),
								}}
								endpoint='expenditureDocs'
								className='w-full ut-button:w-full'
								onClientUploadComplete={() => {
									form.reset();
									toast({
										title: 'Added Expenditure Document',
									});
									router.refresh();
								}}
								onUploadError={error => {
									const fieldErrors = error.data?.zodError?.fieldErrors;

									toast({
										title:
											fieldErrors.description[0] ||
											fieldErrors.expenditureID[0] ||
											fieldErrors.showUploader[0] ||
											error.message,
										variant: 'destructive',
									});
								}}
							/>
							<Button
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
											<FormLabel>Description of the document</FormLabel>
											<FormControl>
												<Textarea
													className='resize-none'
													placeholder='Description of the document'
													type='text'
													disabled={form.formState.isSubmitting}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Description of the document
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting}
									className='w-full my-2'
									type='submit'>
									Add Expenditure
								</Button>
							</form>
						</Form>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default AddExpeditureDocs;
