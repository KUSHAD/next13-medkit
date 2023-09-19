'use client';

import ReportDateRange from '@/components/reports/report-date-range';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import ExpenditureSumViewer from '@/components/reports/expenditure-sum-viewer';
import AttendanceReportViewer from '@/components/reports/attendance-report-viewer';
import PaymentSplitViewer from '@/components/reports/payment-split-viewer';

const ReportsDisplayContainer = ({
	expenditureSum,
	attendanceReports,
	paymentSplit,
}) => {
	return (
		<>
			<ReportDateRange />
			<br />
			<Accordion type='single' collapsible className='w-full'>
				<AccordionItem value='expenditure-sum'>
					<AccordionTrigger>Expenditure</AccordionTrigger>
					<AccordionContent>
						<ExpenditureSumViewer data={expenditureSum} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='payment-split'>
					<AccordionTrigger>Payment Splits</AccordionTrigger>
					<AccordionContent>
						<PaymentSplitViewer data={paymentSplit} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='attendance'>
					<AccordionTrigger>Attendance</AccordionTrigger>
					<AccordionContent>
						<AttendanceReportViewer data={attendanceReports} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};
export default ReportsDisplayContainer;
