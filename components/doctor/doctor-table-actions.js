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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
import EditDoctorForm from './edit-doctor-form';
import DoctorScheduleTabs from './schedule/doctor-schedule-tabs';

const DoctorTableActions = ({ doctor }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/doctor/${doctor.id}/trash`);
			toast({
				title: 'Doctor moved to trash',
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

	const restore = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/doctor/${doctor.id}/restore`);
			toast({
				title: 'Doctor restored',
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
	return doctor.isTrashed ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Restore</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure ?</DialogTitle>
				</DialogHeader>
				<DialogDescription>Restore {doctor.name} ?</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={restore} className='w-full'>
						Restore
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	) : (
		<div className='flex flex-row justify-between max-w-sm w-full'>
			<Sheet>
				<SheetTrigger asChild>
					<Button className='scale-90'>Edit</Button>
				</SheetTrigger>
				<SheetContent side='bottom'>
					<SheetHeader>
						<SheetTitle>Edit Doctor Details</SheetTitle>
					</SheetHeader>
					<SheetDescription>
						<EditDoctorForm doctor={doctor} />
					</SheetDescription>
				</SheetContent>
			</Sheet>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' className='scale-90'>
						Schedule
					</Button>
				</SheetTrigger>
				<SheetContent side='bottom'>
					<SheetHeader>
						<SheetTitle>Doctor Schedule</SheetTitle>
					</SheetHeader>
					<SheetDescription>
						<DoctorScheduleTabs doctorID={doctor.id} />
					</SheetDescription>
				</SheetContent>
			</Sheet>
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
					<DialogDescription>Move {doctor.name} to trash</DialogDescription>
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

export default DoctorTableActions;
