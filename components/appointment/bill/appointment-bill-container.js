import ClientOnly from '@/components/client-only';
import AppointmentDetails from './appointment-details';
import AppointmentBills from './appointment-bills';
import AddBillItem from './add-bill-item';
import AddPartPayment from './payment/add-part-payment';

const AppointmentBillContainer = ({ appointment, procedures, bills }) => {
	return (
		<>
			<AppointmentDetails appointment={appointment} />
			<ClientOnly>
				<h2 className='text-lg text-muted-primary mt-2'>Billing</h2>
				<AddBillItem
					procedures={procedures}
					disabled={appointment.isPartPaymentEnabled || appointment.hasBilled}
				/>
				<AppointmentBills
					data={bills}
					appointment={
						appointment.isPartPaymentEnabled || appointment.hasBilled
					}
				/>
				<h2 className='text-lg text-muted-primary mt-2'>Payment</h2>
				{appointment.isPartPaymentEnabled && (
					<AddPartPayment paymentID={appointment.payment.id} />
				)}
			</ClientOnly>
		</>
	);
};

export default AppointmentBillContainer;
