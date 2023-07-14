import { dashboardLinks } from '@/lib/constants/dashboard-links';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import Link from 'next/link';

const HeroCard = () => {
	return (
		<div className='grid grid-cols-2 pt-5'>
			{dashboardLinks.map(_link => (
				<Link key={_link.href} passHref href={_link.href}>
					<Card className='px-4 py-2 cursor-pointer hover:scale-100 scale-95 transition'>
						<CardHeader>
							<CardTitle>{_link.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>{_link.description}</CardDescription>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default HeroCard;
