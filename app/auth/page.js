import AuthForm from '@/components/auth/auth-form';
import ClientOnly from '@/components/client-only';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export const metadata = {
	title: 'Auth',
};

const Page = () => {
	return (
		<div className='grid h-screen place-items-center'>
			<Card>
				<CardHeader>
					<CardTitle>Authenticate</CardTitle>
					<CardDescription>
						Kindly Authenticate yourself before continuing
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ClientOnly>
						<AuthForm />
					</ClientOnly>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
