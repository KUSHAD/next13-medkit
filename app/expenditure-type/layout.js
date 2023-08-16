import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';
import ExpenditureTypeTabs from '@/components/navbar/expenditure-type/expenditure-type-tabs';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='Manage Expenditure Types' />
				<ExpenditureTypeTabs />
			</ClientOnly>
			{children}
		</>
	);
};

export default Layout;
