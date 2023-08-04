import ClientOnly from '@/components/client-only';
import HeroCard from '@/components/dashboard/hero-card';
import AppBar from '@/components/navbar/app-bar';

const Page = () => {
	return (
		<>
			<ClientOnly>
				<AppBar />
			</ClientOnly>
			<HeroCard />
		</>
	);
};

export default Page;
