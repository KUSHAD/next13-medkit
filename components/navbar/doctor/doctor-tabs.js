'use client';

import DynamicLink from '@/components/dynamic-link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const DoctorTabs = () => {
	const location = usePathname();
	return (
		<div className='flex flex-row justify-between w-full px-4 py-2 rounded'>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/doctor/new' && 'bg-white'
				)}
				href='/doctor/new'>
				New Doctor
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/doctor/manage' && 'bg-white'
				)}
				href='/doctor/manage'>
				Manage Doctor
			</DynamicLink>
			<DynamicLink
				className={cn(
					'w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground',
					location === '/doctor/trash' && 'bg-white'
				)}
				href='/doctor/trash'>
				Trash
			</DynamicLink>
		</div>
	);
};

export default DoctorTabs;
