'use client';

import ExpenditureDatePicker from '@/components/expenditure/expenditure-date-picker';
import ExpenditureViewer from '@/components/expenditure/expenditure-viewer';

const ExpenditureDisplayContainer = ({ expeditures }) => {
	return (
		<>
			<ExpenditureDatePicker />
			<br />
			<ExpenditureViewer data={expeditures} />
		</>
	);
};
export default ExpenditureDisplayContainer;
