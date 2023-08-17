import { getExpenditureTypes } from '@/lib/actions/get-expenditure-types';

const Page = async () => {
	const expenditureTypes = await getExpenditureTypes();
	return <div>Page</div>;
};
export default Page;
