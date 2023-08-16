import ClientOnly from '@/components/client-only';
import AddExpenditureTypeForm from '@/components/expenditure-type/add-expenditure-type-form';

const Page = () => {
	return (
		<ClientOnly>
			<AddExpenditureTypeForm />
		</ClientOnly>
	);
};
export default Page;
