import ClientOnly from '@/components/client-only';
import Footer from '@/components/dashboard/footer';
import HeroCard from '@/components/dashboard/hero-card';
import AppBar from '@/components/navbar/app-bar';

const Page = () => {
	return (
		<>
			<ClientOnly>
				<AppBar />
				<HeroCard />
			</ClientOnly>
			<Footer />
		</>
	);
};

export default Page;
