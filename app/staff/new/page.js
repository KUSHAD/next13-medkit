import ClientOnly from '@/components/client-only';
import AddStaffForm from '@/components/staff/add-staff-form';

const Page = () => {
	return (
		<ClientOnly>
			<AddStaffForm />
		</ClientOnly>
	);
};

export default Page;
