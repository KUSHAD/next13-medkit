'use client';

import { Button } from '../ui/button';
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../ui/dialog';
import { toast } from '../ui/use-toast';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DynamicLink from '../dynamic-link';

const AppointmentTableActions = ({ appointment }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/appointment/${appointment.id}/trash`);
			toast({
				title: 'Appointment moved to trash',
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

	const markAsArrived = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/appointment/${appointment.id}/arrived`);
			toast({
				title: 'User Arrived',
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

	return appointment.hasBilled ? (
		'Billed'
	) : appointment.hasArrived ? (
		<DynamicLink
			href={`/appointment/${appointment.id}/bill?type=${appointment.problemType}`}>
			<Button className='w-full'>Bill</Button>
		</DynamicLink>
	) : (
		<div className='flex flex-row justify-between max-w-sm w-full'>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='scale-90'>Arrived ?</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						Be sure to mark the correct appointment as arrived as this
						appointment will not be deletable afterwards
					</DialogDescription>
					<DialogFooter>
						<Button disabled={disabled} onClick={markAsArrived}>
							Mark as arrived
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='scale-90' variant='destructive'>
						Trash
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
					</DialogHeader>
					<DialogDescription>Move this appointment to trash</DialogDescription>
					<DialogFooter>
						<Button disabled={disabled} onClick={moveToTrash}>
							Move to trash
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AppointmentTableActions;
