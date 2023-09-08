import ClientOnly from '@/components/client-only';
import AddExpenditureTypeForm from '@/components/expenditure-type/add-expenditure-type-form';

export const metadata = {
	title: 'Manage Expenditure Type',
};

const Page = () => {
	return (
		<ClientOnly>
			<AddExpenditureTypeForm />
		</ClientOnly>
	);
};
export default Page;
