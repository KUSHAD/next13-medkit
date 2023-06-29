import ClientOnly from '@/components/client-only';
import HeroCard from '@/components/dashboard/hero-card';
import AppBar from '@/components/navbar/app-bar';

export default function DashboardPage() {
	return (
		<>
			<ClientOnly>
				<AppBar />
			</ClientOnly>
			<HeroCard />
		</>
	);
}
