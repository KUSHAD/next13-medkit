import ExpenditureViewContainer from '@/components/expenditure/view/expenditure-view-container';
import { getExpendituresByID } from '@/lib/actions/get-expenditures';

const Page = async ({ params }) => {
	const expenditureDetails = await getExpendituresByID(params.id);
	return <ExpenditureViewContainer expenditure={expenditureDetails} />;
};
export default Page;
