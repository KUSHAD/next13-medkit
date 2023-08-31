'use client';

import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import AppBar from '@/components/navbar/app-bar';
import { useRouter } from 'next/navigation';

export const metadata = {
	title: 'Expenditure not found',
};

const NotFound = () => {
	const router = useRouter();
	return (
		<ClientOnly>
			<div className='max-w-[769px] m-auto'>
				<div className='w-full'>
					<div className='scale-90'>
						<AppBar title='Expenditure not found' isSecondary />
						<ErrorContainer
							title='Expenditure not found'
							desc='The expenditure you requested is not found'
							showReset
							btnText='Go to Expenditures'
							onClick={() => {
								router.push('/expenditure');
							}}
						/>
					</div>
				</div>
			</div>
		</ClientOnly>
	);
};

export default NotFound;
