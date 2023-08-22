import ClientOnly from '@/components/client-only';
import AddExpenditureForm from '@/components/expenditure/add-expenditure-form';
import { getExpenditureTypes } from '@/lib/actions/get-expenditure-types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const expenditureTypes = await getExpenditureTypes();
	return (
		<ClientOnly>
			<AddExpenditureForm expenditureTypes={expenditureTypes} />
		</ClientOnly>
	);
};
export default Page;
