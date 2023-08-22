import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import ExpenditureForm from '@/components/expenditure/expenditure-form';

const AddExpenditureForm = ({ expenditureTypes }) => {
	return (
		<div className='flex flex-row my-2'>
			<div className='mr-auto' />
			<Dialog>
				<DialogTrigger asChild>
					<Button>Add Expenditure</Button>
				</DialogTrigger>
				<DialogContent className='overflow-y-scroll max-h-screen'>
					<DialogHeader>Add Expenditure</DialogHeader>
					<ExpenditureForm expenditureTypes={expenditureTypes} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default AddExpenditureForm;
