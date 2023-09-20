import { footerLinks } from '@/lib/constants/footer-links';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
const Footer = () => {
	return (
		<footer className='mt-4'>
			<hr />
			<div className='flex flex-row justify-center'>
				{footerLinks.map(_link => (
					<TooltipProvider key={_link.href}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a href={_link.href} target='_blank' className='mx-3 my-2'>
									<_link.logo className='scale-[1.2] text-popover-foreground hover:scale-[2] transition' />
								</a>
							</TooltipTrigger>
							<TooltipContent>{_link.title}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</footer>
	);
};
export default Footer;
