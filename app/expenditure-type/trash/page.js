import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import ExpeditureTypeTable from '@/components/expenditure-type/expenditure-type-table';
import { getTrashedExpenditureTypes } from '@/lib/actions/get-expenditure-types';

export const metadata = {
	title: 'Trashed Expenditure Types',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const expenditureTypes = await getTrashedExpenditureTypes();

	if (expenditureTypes.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer
					title='No Expenditure Type'
					desc='No Expenditure Type were found'
				/>
			</ClientOnly>
		);

	return (
		<ClientOnly>
			<ExpeditureTypeTable data={expenditureTypes} />
		</ClientOnly>
	);
};
export default Page;
