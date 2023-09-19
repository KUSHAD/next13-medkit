import ClientOnly from '@/components/client-only';
import ReportsDisplayContainer from '@/components/reports/report-display-container';
import {
	getAttendanceReports,
	getDoctorSplits,
	getExpenditureSum,
	getPaymentSplits,
} from '@/lib/actions/get-reports';

export const metadata = {
	title: 'View Reports',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const expenditureSumData = await getExpenditureSum(searchParams);
	const attendanceReportsData = await getAttendanceReports(searchParams);
	const paymentSplitData = await getPaymentSplits(searchParams);
	const doctorSplitData = await getDoctorSplits(searchParams);

	const [expenditureSum, attendanceReports, paymentSplit, doctorSplit] =
		await Promise.all([
			expenditureSumData,
			attendanceReportsData,
			paymentSplitData,
			doctorSplitData,
		]);

	return (
		<ClientOnly>
			<ReportsDisplayContainer
				expenditureSum={expenditureSum}
				attendanceReports={attendanceReports}
				paymentSplit={paymentSplit}
				doctorSplit={doctorSplit}
			/>
		</ClientOnly>
	);
};
export default Page;
