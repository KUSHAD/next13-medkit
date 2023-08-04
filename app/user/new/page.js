import ClientOnly from '@/components/client-only';
import AddUserForm from '@/components/user/add-user-form';

const Page = () => {
	return (
		<ClientOnly>
			<AddUserForm />
		</ClientOnly>
	);
};

export default Page;
