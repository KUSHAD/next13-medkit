import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import UsersTable from '@/components/user/users-table';
import { getUsers } from '@/lib/actions/get-users';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const users = await getUsers();
	if (users.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Users' desc='No users were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<UsersTable data={users} />
		</ClientOnly>
	);
};

export default Page;
