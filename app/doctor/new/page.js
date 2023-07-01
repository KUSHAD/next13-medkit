import ClientOnly from '@/components/client-only';
import AddDoctorForm from '@/components/doctor/add-doctor-form';

const Page = () => {
	return (
		<ClientOnly>
			<AddDoctorForm />
		</ClientOnly>
	);
};

export default Page;
