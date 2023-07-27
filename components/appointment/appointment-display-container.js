'use client';

import AppointmentDatePicker from './appointment-date-picker';
import AppointmentViewer from './appointment-viewer';

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
