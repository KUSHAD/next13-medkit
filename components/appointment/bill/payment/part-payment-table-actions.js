'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

const PartPaymentTableActions = ({ partPayment }) => {
	const [disabled, setDisabled] = useState(false);

	const router = useRouter();

	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.delete(`/api/part-payment/${partPayment.id}/trash`);
			toast({
				title: 'Part Payment moved to trash',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		} finally {
			setDisabled(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='destructive'
					disabled={disabled || partPayment.payment.appointment.isBilled}>
					Trash
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Move the entry on
					{new Date(partPayment.dateOfPayment).toLocaleDateString()} of Rs.
					{partPayment.amount} to trash ?
				</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={moveToTrash}>
						Move to trash
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PartPaymentTableActions;
