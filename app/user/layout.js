import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import UserTabs from '@/components/navbar/user/user-tabs';

const UserLayout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Users' />
				<UserTabs />
			</ClientOnly>
			{children}
		</>
	);
};

export default UserLayout;
