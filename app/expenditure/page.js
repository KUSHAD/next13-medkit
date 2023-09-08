import ClientOnly from '@/components/client-only';
import AddExpenditureForm from '@/components/expenditure/add-expenditure-form';
import ExpenditureDisplayContainer from '@/components/expenditure/expenditure-display-container';
import { getExpenditureTypes } from '@/lib/actions/get-expenditure-types';
import { getExpendituresByDate } from '@/lib/actions/get-expenditures';

export const metadata = {
	title: 'View Expenditures',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const expenditureTypesData = await getExpenditureTypes();
	const expendituresData = await getExpendituresByDate(searchParams);

	const [expenditureTypes, expenditures] = await Promise.all([
		expenditureTypesData,
		expendituresData,
	]);

	return (
		<ClientOnly>
			<AddExpenditureForm expenditureTypes={expenditureTypes} />
			<ExpenditureDisplayContainer expeditures={expenditures} />
		</ClientOnly>
	);
};
export default Page;
