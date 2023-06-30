'use client';

import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';

const DynamicLink = forwardRef(({ href, children, ...props }, ref) => {
	const router = useRouter();

	return (
		<a
			{...props}
			ref={ref}
			href={href}
			onClick={e => {
				e.preventDefault();
				router.push(href);
				router.refresh();
			}}>
			{children}
		</a>
	);
});

DynamicLink.displayName = 'DynamicLink';

export default DynamicLink;
