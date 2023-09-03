import ClientOnly from '@/components/client-only';
import AppointmentDetails from '@/components/appointment/bill/appointment-details';
import AppointmentBills from '@/components/appointment/bill/appointment-bills';
import AddBillItem from '@/components/appointment/bill/add-bill-item';
import AddPartPayment from '@/components/appointment/bill/payment/add-part-payment';
import PartPaymentDisplay from '@/components/appointment/bill/payment/part-payment-display';
import ErrorContainer from '@/components/error-container';
import AddAppointmentTest from '@/components/appointment/bill/tests/add-appointment-test';
import ShowAppointmentTests from './tests/show-appointment-tests';

const AppointmentBillContainer = ({ appointment, procedures, bills }) => {
	return (
		<>
			<AppointmentDetails appointment={appointment} />
			<h2 className='text-lg text-muted-primary mt-2'>Test Documents</h2>
			<ClientOnly>
				<AddAppointmentTest disabled={appointment.isBilled} />
				<ShowAppointmentTests
					docs={appointment.appointmentTests}
					disabled={appointment.isBilled}
				/>
			</ClientOnly>
			<h2 className='text-lg text-muted-primary mt-2'>Billing</h2>
			<ClientOnly>
				<AddBillItem
					procedures={procedures}
					disabled={appointment.isPartPaymentEnabled || appointment.isBilled}
				/>
				<AppointmentBills
					data={bills}
					appointment={appointment.isPartPaymentEnabled || appointment.isBilled}
				/>
			</ClientOnly>
			{appointment.isPartPaymentEnabled && (
				<ClientOnly>
					<h2 className='text-lg text-muted-primary mt-2'>Payment</h2>
					<AddPartPayment
						disabled={appointment.isBilled}
						paymentID={appointment.payment.id}
					/>
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
