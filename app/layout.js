import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/providers/theme-provider';
import '@uploadthing/react/styles.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: {
		template: '%s | Next13 Medkit',
		default: 'Next13 Medkit',
	},
	manifest: '/manifest.json',
	description:
		'Medical Reception App made using next13 app dir, tailwindcss, shadcn-ui, mongodb, prisma, uploadthing and firebase mobile authentication',
	themeColor: '#16A34A',
	metadataBase: new URL('https://next13-medkit.vercel.app/'),
	openGraph: {
		title: 'Next 13 Medkit',
		description:
			'Medical Reception App made using next13 app dir, tailwindcss, shadcn-ui, mongodb, prisma, uploadthing and firebase mobile authentication',
		url: 'https://next13-medkit.vercel.app',
		siteName: 'Next 13 Medkit',
		locale: 'en_US',
		type: 'website',
		authors: ['Kushad Chakraborty'],
	},
	keywords: ['medical application', 'medkit', 'next13-medkit'],
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
