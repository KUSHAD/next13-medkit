import ClientOnly from '@/components/client-only';
import AppBar from '@/components/navbar/app-bar';

const Layout = ({ children }) => {
	return (
		<>
			<ClientOnly>
				<AppBar
					isBack
					backHref='/expenditure'
					title='View Expenditure'
					isSecondary
				/>
			</ClientOnly>
			<div className='scale-90'>{children}</div>
		</>
	);
};

export default Layout;
