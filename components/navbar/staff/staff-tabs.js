'use client';

import DynamicLink from '@/components/dynamic-link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const StaffTabs = () => {
	const location = usePathname();
	return (
		<div className='flex flex-row justify-between w-full px-4 py-2 rounded'>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/staff/manage' && 'bg-muted'
				)}
				href='/staff/manage'>
				Manage Staff
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/staff/new' && 'bg-muted'
				)}
				href='/staff/new'>
				New Staff
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/staff/trash' && 'bg-muted'
				)}
				href='/staff/trash'>
				Trash
			</DynamicLink>
		</div>
	);
};

export default StaffTabs;
