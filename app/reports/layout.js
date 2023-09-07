import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar isBack backHref='/' title='View Reports' />
			</ClientOnly>
			{children}
		</>
	);
};

export default Layout;
