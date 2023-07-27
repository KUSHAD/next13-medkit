import { Button } from '@/components/ui/button';
import {
	DialogHeader,
	DialogTrigger,
	Dialog,
	DialogContent,
} from '@/components/ui/dialog';
import AddBillItemForm from './add-bill-item-form';

const AddBillItem = ({ procedures }) => {
	return (
		<div className='flex flex-row'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>Add Bill Item</Button>
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
