import AppointmentBillContainer from '@/components/appointment/bill/appointment-bill-container';
import ClientOnly from '@/components/client-only';
import { getAppointmentByID } from '@/lib/actions/get-appointments';
import { getProceduresByTreatment } from '@/lib/actions/get-procedures';

export const metadata = {
	title: 'Bill Appointment',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params, searchParams }) => {
	const appointmentData = await getAppointmentByID(params.id);
	const proceduresData = await getProceduresByTreatment(searchParams.type);

	const [appointment, procedures] = await Promise.all([
		appointmentData,
		proceduresData,
	]);

	return (
		<ClientOnly>
			<AppointmentBillContainer
				appointment={appointment}
				procedures={procedures}
				bills={appointment.bills}
			/>
		</ClientOnly>
	);
};

export default page;
