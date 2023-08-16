import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/providers/theme-provider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'Lions Medkit',
	description: 'Lions Medkit app for Lions Club of Chakdaha Block',
	manifest: '/manifest.json',
	themeColor: '#2563EB',
	metadataBase: new URL('https://lions-medkit.vercel.app/'),
	openGraph: {
		title: 'Lions Medkit',
		description: 'Lions Medkit app for Lions Club of Chakdaha Block',
		url: 'https://lions-medkit-vercel.app',
		siteName: 'Lions Medkit',
		locale: 'en_US',
		type: 'website',
		authors: ['Kushad Chakraborty'],
	},
	keywords: [
		'lions club',
		'chakdaha block',
		'medical application',
		'lions medkit',
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={nunito.className} suppressHydrationWarning>
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<div className='bg-primary-foreground min-h-screen'>
						<div className='max-w-[769px] m-auto'>
							<div className='w-full'>{children}</div>
							<Toaster />
						</div>
						<Analytics />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
