import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import DoctorTabs from '@/components/navbar/doctor/doctor-tabs';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Doctor' />
				<DoctorTabs />
			</ClientOnly>
			{children}
		</>
	);
};

export default Layout;
