import ClientOnly from '@/components/client-only';
import ReportsDisplayContainer from '@/components/reports/report-display-container';
import {
	getAttendanceReports,
	getExpenditureSum,
} from '@/lib/actions/get-reports';

export const metadata = {
	title: 'View Reports',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const expenditureSumData = await getExpenditureSum(searchParams);
	const attendanceReportsData = await getAttendanceReports(searchParams);

	const [expenditureSum, attendanceReports] = await Promise.all([
		expenditureSumData,
		attendanceReportsData,
	]);

	return (
		<ClientOnly>
			<ReportsDisplayContainer
				expenditureSum={expenditureSum}
				attendanceReports={attendanceReports}
			/>
		</ClientOnly>
	);
};
export default Page;
