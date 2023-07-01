import ClientOnly from '@/components/client-only';
import AddUserForm from '@/components/user/add-user-form';

const NewUserPage = () => {
	return (
		<ClientOnly>
			<AddUserForm />
		</ClientOnly>
	);
};

export default NewUserPage;
