import ClientOnly from '@/components/client-only';
import AppointmentDetails from './appointment-details';
import AppointmentBills from './appointment-bills';
import AddBillItem from './add-bill-item';
import AddPartPayment from './payment/add-part-payment';
import PartPaymentDisplay from './payment/part-payment-display';
import ErrorContainer from '@/components/error-container';

const AppointmentBillContainer = ({ appointment, procedures, bills }) => {
	return (
		<>
			<AppointmentDetails appointment={appointment} />
			<h2 className='text-lg text-muted-primary mt-2'>Billing</h2>
			<ClientOnly>
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
			</ClientOnly>
			<h2 className='text-lg text-muted-primary mt-2'>Payment</h2>
			{appointment.isPartPaymentEnabled && (
				<ClientOnly>
					<AddPartPayment paymentID={appointment.payment.id} />
					{appointment.payment.partPayment.length === 0 ? (
						<ErrorContainer
							title='No Part Payments Added'
							desc='Add Part Payment to see'
						/>
					) : (
						<PartPaymentDisplay data={appointment.payment.partPayment} />
					)}
				</ClientOnly>
			)}
		</>
	);
};

export default AppointmentBillContainer;
