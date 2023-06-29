import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import AddUserForm from '@/components/user/add-user-form';

const UserPage = () => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Users' />
				<AddUserForm />
			</ClientOnly>
		</>
	);
};

export default UserPage;
