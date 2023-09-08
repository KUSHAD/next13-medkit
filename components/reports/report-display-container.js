'use client';

import ReportDateRange from '@/components/reports/report-date-range';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import ExpenditureSumViewer from '@/components/reports/expenditure-sum-viewer';

const ReportsDisplayContainer = ({ expenditureSum }) => {
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
			</Accordion>
		</>
	);
};
export default ReportsDisplayContainer;
