import { getAttendanceByDate } from '@/lib/actions/get-attendance';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import ClientOnly from '@/components/client-only';
import AttendanceDisplayContainer from '@/components/attendance/attendance-display-container';
import AddAttendanceForm from '@/components/attendance/add-attendance-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const doctorData = await getAppointmentDoctors();
	const attendanceData = await getAttendanceByDate(searchParams);

	const [doctors, attendances] = await Promise.all([
		doctorData,
		attendanceData,
	]);
	return (
		<ClientOnly>
			<br />
			<AddAttendanceForm doctors={doctors} />
			<br />
			<AttendanceDisplayContainer attendances={attendances} />
		</ClientOnly>
	);
};
export default Page;
