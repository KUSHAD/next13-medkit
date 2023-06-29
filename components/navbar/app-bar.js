'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const AppBar = ({ title = 'Dashboard', isBack = false, backHref = '/' }) => {
	return (
		<div className='w-full sticky top-0 left-0 bg-foreground rounded flex flex-row'>
			<div className='px-4 py-2 text-primary-foreground text-lg'>
				{isBack && (
					<Link legacyBehavior passHref href={backHref}>
						<Button variant='secondary' size='icon' className={cn('mr-2')}>
							<ArrowLeftIcon />
						</Button>
					</Link>
				)}
				{title}
			</div>
		</div>
	);
};

export default AppBar;
