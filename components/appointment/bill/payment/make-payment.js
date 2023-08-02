'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';

const MakePayment = ({ show, total }) => {
	const { id } = useParams();
	const router = useRouter();
	const [disabled, setDisabled] = useState(false);
	const [checked, setChecked] = useState(false);

	const makePayment = async () => {
		try {
			setDisabled(true);
			const data = {
				appointmentID: id,
				total,
			};

			await axios.post('/api/payment', data);

			toast({
				title: 'Appointment has been billed',
			});

			router.push('/appointment');
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,

				variant: 'destructive',
			});
		} finally {
			setDisabled(false);
		}
	};

	const enablePartPayment = async () => {
		try {
			setDisabled(true);
			const data = {
				appointmentID: id,
				total,
			};

			await axios.post('/api/payment/enable-part-payment', data);

			toast({
				title: 'Part Payment Enabled',
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
		show && (
			<>
				<div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow my-2'>
					<Checkbox
						disabled={disabled}
						value={checked}
						onClick={() => setChecked(_prevState => !_prevState)}
					/>
					<div className='space-y-1 leading-none flex flex-col'>
						<Label>Enable Part payment</Label>
						<span className='text-sm text-muted-foreground'>
							Mark this Billing with part payment ?
						</span>
					</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button disabled={disabled} className='w-full my-2'>
							{checked
								? 'Continue with part payment ?'
								: 'Continue with payment ?'}
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{checked
									? 'Continue with part payment ?'
									: 'Continue with payment ?'}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							Once you click the button below you cannot add bill items.
							{checked
								? 'And you can only add the part payments'
								: 'And this appointment will be billed'}
						</DialogDescription>
						<DialogFooter>
							{checked ? (
								<Button disabled={disabled} onClick={enablePartPayment}>
									Enable Part Payment
								</Button>
							) : (
								<Button disabled={disabled} onClick={makePayment}>
									Make Payment
								</Button>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</>
		)
	);
};

export default MakePayment;
