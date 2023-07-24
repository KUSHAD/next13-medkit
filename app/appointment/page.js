import AddAppointmentForm from '@/components/appointment/add-appointment-form';
import AppointmentDisplayContainer from '@/components/appointment/appointment-display-container';
import ClientOnly from '@/components/client-only';
import { getAppointmentByDate } from '@/lib/actions/get-appointments';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import { getAppointmentUsers } from '@/lib/actions/get-users';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const doctorData = await getAppointmentDoctors();
	const userData = await getAppointmentUsers();
	const appointmentData = await getAppointmentByDate(searchParams);

	const [doctors, users, appointments] = await Promise.all([
		doctorData,
		userData,
		appointmentData,
	]);

	return (
		<div className='mt-4'>
			<ClientOnly>
				<AddAppointmentForm doctors={doctors} users={users} />
				<br />
				<AppointmentDisplayContainer data={appointments} />
			</ClientOnly>
		</div>
	);
};

export default Page;
