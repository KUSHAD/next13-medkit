'use client';

import DynamicLink from '@/components/dynamic-link';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserTabs = () => {
	const location = usePathname();
	return (
		<div className='flex flex-row justify-between w-full px-4 py-2 rounded'>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/user/new' && 'bg-white'
				)}
				href='/user/new'>
				New User
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/user/manage' && 'bg-white'
				)}
				href='/user/manage'>
				Manage User
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/user/trash' && 'bg-white'
				)}
				href='/user/trash'>
				Trash
			</DynamicLink>
		</div>
	);
};

export default UserTabs;
