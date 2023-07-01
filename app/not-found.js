'use client';

import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import AppBar from '@/components/navbar/app-bar';
import { useRouter } from 'next/navigation';

export const metadata = {
	title: 'Page not found',
};

const NotFound = () => {
	const router = useRouter();
	return (
		<ClientOnly>
			<AppBar title='Page not found' />
			<ErrorContainer
				title='Page not found'
				desc='The page you requested is not found'
				showReset
				btnText='Go to Home'
				onClick={() => {
					router.push('/');
				}}
			/>
		</ClientOnly>
	);
};

export default NotFound;
