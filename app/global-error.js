'use client';

import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';

export default function GlobalError({ error, reset }) {
	return (
		<html>
			<body className='bg-primary-foreground'>
				<div className='max-w-[769px] m-auto'>
					<div className='w-full'>
						<ClientOnly>
							<ErrorContainer
								title='App Error'
								onClick={() => reset()}
								desc={error.message}
								showReset
							/>
						</ClientOnly>
					</div>
				</div>
			</body>
		</html>
	);
}
