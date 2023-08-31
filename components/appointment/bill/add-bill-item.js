import { Button } from '@/components/ui/button';
import {
	DialogHeader,
	DialogTrigger,
	Dialog,
	DialogContent,
} from '@/components/ui/dialog';
import AddBillItemForm from '@/components/appointment/bill/add-bill-item-form';

const AddBillItem = ({ procedures, disabled }) => {
	return (
		<div className='flex flex-row  my-2'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline' disabled={disabled}>
						Add Bill Item
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogHeader>Add Bill Item</DialogHeader>
					</DialogHeader>
					<AddBillItemForm procedures={procedures} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddBillItem;
