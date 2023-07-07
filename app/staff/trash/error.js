'use client';

import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';

const Error = ({ error, reset }) => {
	return (
		<ClientOnly>
			<ErrorContainer onClick={() => reset()} desc={error.message} showReset />
		</ClientOnly>
	);
};

export default Error;
