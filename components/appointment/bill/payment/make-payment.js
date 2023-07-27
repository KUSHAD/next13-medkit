'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const MakePayment = ({ show, total }) => {
	const { id } = useParams();
	const router = useRouter();

	const makePayment = async () => {
		try {
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
		}
	};

	return (
		show && (
			<Button onClick={makePayment} className='w-full my-2'>
				Continue with payment
			</Button>
		)
	);
};

export default MakePayment;
