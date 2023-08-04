import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import PartPaymentForm from './part-payment-form';

const AddPartPayment = ({ paymentID, disabled }) => {
	return (
		<div className='flex flex-row'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button disabled={disabled}>Add Part Payment</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Add Part Payment</DialogTitle>
					<PartPaymentForm paymentID={paymentID} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddPartPayment;
