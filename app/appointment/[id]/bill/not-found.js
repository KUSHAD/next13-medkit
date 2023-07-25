'use client';

import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import AppBar from '@/components/navbar/app-bar';
import { useRouter } from 'next/navigation';

export const metadata = {
	title: 'Appointment not found',
};

const NotFound = () => {
	const router = useRouter();
	return (
		<ClientOnly>
			<div className='max-w-[769px] m-auto'>
				<div className='w-full'>
					<div className='scale-90'>
						<AppBar title='Appointment not found' isSecondary />
						<ErrorContainer
							title='Appointment not found'
							desc='The appointment you requested is not found'
							showReset
							btnText='Go to Appointments'
							onClick={() => {
								router.push('/appointment');
							}}
						/>
					</div>
				</div>
			</div>
		</ClientOnly>
	);
};

export default NotFound;
