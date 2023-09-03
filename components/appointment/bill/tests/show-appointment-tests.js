'use client';

import ErrorContainer from '@/components/error-container';
import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ShowAppointmentTests = ({ docs, disabled: _disabled }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();

	const onDeleteDoc = async _id => {
		try {
			setDisabled(true);
			await axios.delete(`/api/appointment-test/${_id}/trash`);
			router.refresh();
			toast({
				title: 'Document Deleted',
			});
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,
				variant: 'destructive',
			});
		} finally {
			setDisabled(false);
		}
	};

	return docs.length === 0 ? (
		<ErrorContainer
			title='No Test Docs'
			desc='This Appointment has no Test Documents'
		/>
	) : (
		docs.map(_doc => (
			<Accordion
				type='single'
				collapsible
				className='w-full my-2'
				key={_doc.id}>
				<AccordionItem value={_doc.id}>
					<AccordionTrigger className='py-2 px-4'>
						{_doc.description}
					</AccordionTrigger>
					<AccordionContent className='py-2 px-4'>
						<div>
							<Image
								quality={100}
								width={300}
								height={300}
								alt={_doc.description}
								src={`https://utfs.io/f/${_doc.docSrc}`}
							/>
							<div className='flex flex-row'>
								<Dialog>
									<DialogTrigger asChild>
										<Button disabled={disabled} className='my-2 scale-90'>
											View
										</Button>
									</DialogTrigger>
									<DialogContent>
										<Image
											width={200000}
											height={20000}
											quality={100}
											alt={_doc.description}
											src={`https://utfs.io/f/${_doc.docSrc}`}
										/>
									</DialogContent>
								</Dialog>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											disabled={disabled || _disabled}
											className='my-2 scale-90'
											variant='destructive'>
											Trash
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>Delete Test Document</DialogHeader>
										Are you sure to delete &ldquo;{_doc.description}&rdquo; ? It
										cannot be undone
										<Button
											disabled={disabled}
											onClick={() => onDeleteDoc(_doc.id)}>
											Trash
										</Button>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		))
	);
};
export default ShowAppointmentTests;
