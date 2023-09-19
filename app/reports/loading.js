import AttendanceSkeleton from '@/components/reports/skeletons/attendance-skeleton';
import ExpenditureSumSkeleton from '@/components/reports/skeletons/expenditure-sum-skeleton';
import PaymentSplitSkeleton from '@/components/reports/skeletons/payment-split-skeleton';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const Loading = () => {
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='expenditure-sum'>
				<AccordionTrigger>Expenditure</AccordionTrigger>
				<AccordionContent>
					<ExpenditureSumSkeleton />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-split'>
				<AccordionTrigger>Payment Splits</AccordionTrigger>
				<AccordionContent>
					<PaymentSplitSkeleton />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='attendance'>
				<AccordionTrigger>Attendance</AccordionTrigger>
				<AccordionContent>
					<AttendanceSkeleton />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
export default Loading;
