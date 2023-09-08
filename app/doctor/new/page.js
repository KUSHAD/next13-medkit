import ClientOnly from '@/components/client-only';
import AddDoctorForm from '@/components/doctor/add-doctor-form';

export const metadata = {
	title: 'New Doctor',
};

const Page = () => {
	return (
		<ClientOnly>
			<AddDoctorForm />
		</ClientOnly>
	);
};

export default Page;
