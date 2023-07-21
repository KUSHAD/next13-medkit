import AddAppointmentForm from '@/components/appointment/add-appointment-form';
import ClientOnly from '@/components/client-only';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import { getAppointmentUsers } from '@/lib/actions/get-users';

const Page = async () => {
	const doctorData = await getAppointmentDoctors();
	const userData = await getAppointmentUsers();

	const [doctors, users] = await Promise.all([doctorData, userData]);

	return (
		<div className='mt-4'>
			<ClientOnly>
				<AddAppointmentForm doctors={doctors} users={users} />
			</ClientOnly>
		</div>
	);
};

export default Page;
