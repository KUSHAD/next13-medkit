'use client';

import DynamicLink from '@/components/dynamic-link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const ProcedureTabs = () => {
	const location = usePathname();
	return (
		<div className='flex flex-row justify-between w-full px-4 py-2 rounded'>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/procedure/manage' && 'bg-muted'
				)}
				href='/procedure/manage'>
				Manage Procedure
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/procedure/new' && 'bg-muted'
				)}
				href='/procedure/new'>
				New Procedure
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/procedure/trash' && 'bg-muted'
				)}
				href='/procedure/trash'>
				Trash
			</DynamicLink>
		</div>
	);
};

export default ProcedureTabs;
