'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';
import DynamicLink from '@/components/dynamic-link';

const AppBar = ({
	title = 'Dashboard',
	isBack = false,
	backHref = '/',
	isSecondary = false,
}) => {
	const pathname = usePathname();
	return (
		<div
			className={cn(
				'w-full sticky top-0 left-0 flex flex-row py-2',
				isSecondary
					? 'bg-muted border-y border-y-muted my-2 scale-90 z-10'
					: 'bg-primary rounded'
			)}>
			<div
				className={cn(
					'px-4 py-2 text-lg',
					isSecondary ? 'text-muted-foreground' : 'text-primary-foreground ',
					pathname === '/' && 'mr-auto'
				)}>
				{isBack && (
					<DynamicLink href={backHref}>
						<Button
							variant={isSecondary ? 'default' : 'secondary'}
							size='icon'
							className={cn('mr-2')}>
							<ArrowLeftIcon />
						</Button>
					</DynamicLink>
				)}
				{title}
			</div>
			{pathname === '/' && <ThemeToggle />}
		</div>
	);
};

export default AppBar;
