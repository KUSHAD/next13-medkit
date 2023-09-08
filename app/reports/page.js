import ClientOnly from '@/components/client-only';
import ReportsDisplayContainer from '@/components/reports/report-display-container';
import { getExpenditureSum } from '@/lib/actions/get-reports';

export const metadata = {
	title: 'View Reports',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const expenditureSum = await getExpenditureSum(searchParams);
	return (
		<ClientOnly>
			<ReportsDisplayContainer expenditureSum={expenditureSum} />
		</ClientOnly>
	);
};
export default Page;
