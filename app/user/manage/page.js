import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import ManageUsersTable from '@/components/user/manage-users-table';
import { getUsers } from '@/lib/get-users';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UserManagePage = async () => {
	const users = await getUsers();
	if (users.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Users' desc='No users were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<ManageUsersTable data={users} />
		</ClientOnly>
	);
};

export default UserManagePage;
