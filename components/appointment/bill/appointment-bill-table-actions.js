'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AppointmentBillTableActions = ({ bill }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.delete(`/api/bill/${bill.id}/trash`);
			toast({
				title: 'Item moved to trash',
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
					disabled={
						bill.appointment.isBilled || bill.appointment.isPartPaymentEnabled
					}
					className='scale-90'
					variant='destructive'>
					Trash
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogDescription>Move this bill item to trash</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={moveToTrash}>
						Move to trash
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentBillTableActions;
