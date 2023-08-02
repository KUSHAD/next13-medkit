import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'Lions Medkit',
	description: 'Lions Medkit app for Lions Club of Chakdaha Block',
	manifest: '/manifest.json',
	themeColor: '#09090B',
	openGraph: {
		title: 'Lions Medkit',
		description: 'Lions Medkit app for Lions Club of Chakdaha Block',
		url: 'https://lions-medkit-vercel.app',
		siteName: 'Lions Medkit',
		locale: 'en_US',
		type: 'website',
		authors: ['Kushad Chakraborty'],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={nunito.className}>
			<body className='bg-primary-foreground'>
				<div className='max-w-[769px] m-auto'>
					<div className='w-full'>{children}</div>
					<Toaster />
				</div>
				<Analytics />
			</body>
		</html>
	);
}
