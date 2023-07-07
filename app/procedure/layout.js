import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import ProcedureTabs from '@/components/navbar/procedure/procedure-tabs';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Procedures' />
				<ProcedureTabs />
			</ClientOnly>
			{children}
		</>
	);
};

export default Layout;
