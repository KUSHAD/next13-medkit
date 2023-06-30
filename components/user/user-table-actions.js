'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
				title: error.response.data.message,
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
				title: error.response.data.message,
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
		<div className='flex flex-row justify-between'>
			<Sheet>
				<SheetTrigger asChild>
					<Button className='w-1/2 scale-95'>Edit User Details</Button>
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
					<Button variant='destructive'>Move to Trash</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
					</DialogHeader>
					<DialogDescription>Move {user.name} to trash</DialogDescription>
					<DialogFooter>
						<Button
							disabled={disabled}
							onClick={moveToTrash}
							className='w-1/2 scale-95'>
							Move to trash
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UserTableActions;
