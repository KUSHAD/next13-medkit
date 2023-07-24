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

const DoctorScheduleTableAction = ({ schedule }) => {
	const [disabled, setDisabled] = useState(false);

	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/schedule/${schedule.id}/trash`);
			toast({
				title: 'Schedule moved to trash',
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

	const restore = async () => {
		try {
			setDisabled(true);
			await axios.patch(`/api/schedule/${schedule.id}/restore`);
			toast({
				title: 'Schedule restored',
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

	return schedule.isTrashed ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Restore</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Move the Slot :- {schedule.day},{schedule.slot} to trash
				</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={restore}>
						Restore
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	) : (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Trash</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Move the Slot :- {schedule.day},{schedule.slot} to trash
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

export default DoctorScheduleTableAction;
