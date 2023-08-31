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

const AttendanceTableActions = ({ attendance }) => {
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const moveToTrash = async () => {
		try {
			setDisabled(true);
			await axios.delete(`/api/attendance/${attendance.id}/trash`);
			toast({
				title: 'Attendance moved to trash',
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
				<Button className='scale-90' variant='destructive'>
					Trash
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<DialogDescription>Move this attendance to trash</DialogDescription>
				<DialogFooter>
					<Button disabled={disabled} onClick={moveToTrash}>
						Move to trash
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AttendanceTableActions;
