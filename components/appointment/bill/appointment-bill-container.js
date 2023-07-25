import ClientOnly from '@/components/client-only';
import AppointmentDetails from './appointment-details';
import AppointmentBills from './appointment-bills';
import AddBillItem from './add-bill-item';

const AppointmentBillContainer = ({ appointment, procedures, bills }) => {
	return (
		<>
			<AppointmentDetails appointment={appointment} />
			<ClientOnly>
				<h2 className='text-lg  text-muted-primary mt-2'>Billing</h2>
				<AddBillItem procedures={procedures} />
				<AppointmentBills data={bills} />
			</ClientOnly>
		</>
	);
};

export default AppointmentBillContainer;
