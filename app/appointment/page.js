import AddAppointmentForm from '@/components/appointment/add-appointment-form';
import AppointmentDisplayContainer from '@/components/appointment/appointment-display-container';
import ClientOnly from '@/components/client-only';
import { getAppointmentByDate } from '@/lib/actions/get-appointments';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';

export const metadata = {
	title: 'Appointments',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ searchParams }) => {
	const doctorData = await getAppointmentDoctors();
	const appointmentData = await getAppointmentByDate(searchParams);

	const [doctors, appointments] = await Promise.all([
		doctorData,
		appointmentData,
	]);

	return (
		<div className='mt-4'>
			<ClientOnly>
				<AddAppointmentForm doctors={doctors} />
				<br />
				<AppointmentDisplayContainer data={appointments} />
			</ClientOnly>
		</div>
	);
};

export default Page;
