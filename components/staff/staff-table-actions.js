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
} from '../ui/dialog';
import { toast } from '@/components/ui/use-toast';
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
} from '@/components/ui/sheet';
import EditStaffForm from '@/components/staff/edit-staff-form';

const StaffTableActions = ({ staff }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/staff/${staff.id}/trash`);
			toast({
				title: 'Staff moved to trash',
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
			await axios.patch(`/api/staff/${staff.id}/restore`);
			toast({
				title: 'Staff restored',
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
	return staff.isTrashed ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Restore</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure ?</DialogTitle>
				</DialogHeader>
				<DialogDescription>Restore {staff.name} ?</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={restore}>
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
						<SheetTitle>Edit Staff Details</SheetTitle>
					</SheetHeader>
					<SheetDescription>
						<EditStaffForm staff={staff} />
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
					<DialogDescription>Move {staff.name} to trash</DialogDescription>
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

export default StaffTableActions;
