import AppointmentBillContainer from '@/components/appointment/bill/appointment-bill-container';
import ClientOnly from '@/components/client-only';
import { getAppointmentByID } from '@/lib/actions/get-appointments';
import { getBillsByAppointment } from '@/lib/actions/get-bills';
import { getProceduresByTreatment } from '@/lib/actions/get-procedures';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params, searchParams }) => {
	const appointmentData = await getAppointmentByID(params.id);
	const proceduresData = await getProceduresByTreatment(searchParams.type);
	const billsData = await getBillsByAppointment(params.id);

	const [appointment, procedures, bills] = await Promise.all([
		appointmentData,
		proceduresData,
		billsData,
	]);

	return (
		<ClientOnly>
			<AppointmentBillContainer
				appointment={appointment}
				procedures={procedures}
				bills={bills}
			/>
		</ClientOnly>
	);
};

export default page;
