import AddUserForm from '@/components/user/add-user-form';

const { default: ClientOnly } = require('@/components/client-only');

const NewUserPage = () => {
	return (
		<ClientOnly>
			<AddUserForm />
		</ClientOnly>
	);
};

export default NewUserPage;
