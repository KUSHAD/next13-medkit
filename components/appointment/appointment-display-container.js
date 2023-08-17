'use client';

import AppointmentDatePicker from '@/components/appointment/appointment-date-picker';
import AppointmentViewer from '@/components/appointment/appointment-viewer';

const AppointmentDisplayContainer = ({ data }) => {
	return (
		<>
			<AppointmentDatePicker />
			<br />
			<AppointmentViewer data={data} />
		</>
	);
};

export default AppointmentDisplayContainer;
