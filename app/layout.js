import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'Lions Medkit',
	description: 'Lions Medkit app for Lions Club of Chakdaha Block',
	icons: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			sizes: '64x64',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '192x192',
			url: '/logo192.png',
		},
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={nunito.className}>
			<body className='bg-muted'>
				<div className='max-w-[769px] m-auto'>
					<div className='w-full'>{children}</div>
					<Toaster />
				</div>
			</body>
		</html>
	);
}
