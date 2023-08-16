'use client';

import DynamicLink from '@/components/dynamic-link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const ExpenditureTypeTabs = () => {
	const location = usePathname();
	return (
		<div className='flex flex-row justify-between w-full px-4 py-2 rounded'>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/expenditure-type/manage' && 'bg-muted'
				)}
				href='/expenditure-type/manage'>
				Manage Expenditure Type
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/expenditure-type/new' && 'bg-muted'
				)}
				href='/expenditure-type/new'>
				New Expenditure Type
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/expenditure-type/trash' && 'bg-muted'
				)}
				href='/expenditure-type/trash'>
				Trash
			</DynamicLink>
		</div>
	);
};

export default ExpenditureTypeTabs;
