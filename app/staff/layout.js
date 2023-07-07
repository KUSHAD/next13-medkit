import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import StaffTabs from '@/components/navbar/staff/staff-tabs';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Staff' />
				<StaffTabs />
			</ClientOnly>
			{children}
		</>
	);
};

export default Layout;
