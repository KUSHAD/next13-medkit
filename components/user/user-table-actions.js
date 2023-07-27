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
import EditUserForm from './edit-user-form';

const UserTableActions = ({ user }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/user/${user.id}/trash`);
			toast({
				title: 'User moved to trash',
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
			await axios.patch(`/api/user/${user.id}/restore`);
			toast({
				title: 'User restored',
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
	return user.isTrashed ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Restore</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure ?</DialogTitle>
				</DialogHeader>
				<DialogDescription>Restore {user.name} ?</DialogDescription>
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
						<SheetTitle>Edit User Details</SheetTitle>
					</SheetHeader>
					<SheetDescription>
						<EditUserForm user={user} />
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
					<DialogDescription>Move {user.name} to trash</DialogDescription>
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

export default UserTableActions;
