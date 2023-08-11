'use client';

import AttendanceDatePicker from './attendance-date-picker';
import AttendanceViewer from './attendance-viewer';

const AttendanceDisplayContainer = ({ attendances }) => {
	return (
		<>
			<AttendanceDatePicker />
			<br />
			<AttendanceViewer data={attendances} />
		</>
	);
};
export default AttendanceDisplayContainer;
