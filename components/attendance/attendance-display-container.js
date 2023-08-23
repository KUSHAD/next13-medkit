'use client';

import AttendanceDatePicker from '@/components/attendance/attendance-date-picker';
import AttendanceViewer from '@/components/attendance/attendance-viewer';

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
