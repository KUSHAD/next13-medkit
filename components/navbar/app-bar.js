'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const AppBar = ({
	title = 'Dashboard',
	isBack = false,
	backHref = '/',
	isSecondary = false,
}) => {
	return (
		<div
			className={cn(
				'w-full sticky top-0 left-0 flex flex-row py-2',
				isSecondary
					? 'bg-muted border-y border-y-muted my-2 scale-90 z-10'
					: 'bg-foreground rounded'
			)}>
			<div
				className={cn(
					'px-4 py-2text-lg',
					isSecondary ? 'text-muted-foreground' : 'text-primary-foreground '
				)}>
				{isBack && (
					<Link legacyBehavior passHref href={backHref}>
						<Button
							variant={isSecondary ? 'default' : 'secondary'}
							size='icon'
							className={cn('mr-2')}>
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
