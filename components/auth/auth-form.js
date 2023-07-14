'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
	RecaptchaVerifier,
	inMemoryPersistence,
	setPersistence,
	signInWithPhoneNumber,
} from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import { setCookie } from 'cookies-next';
const authValidationSchema = yup.object({
	mobile: yup
		.string()
		.required('Mobile Required')
		.length(10, 'Must be 10 digits')
		.transform(_value => (isNaN(_value) ? undefined : _value))
		.typeError('Mobile number should be all digits'),
	showOTP: yup.boolean(),
	otp: yup.string().when('showOTP', {
		is: true,
		then: () =>
			yup
				.string()
				.required('OTP is required')
				.length(6, 'Must be 6 digits')
				.transform(_value => (isNaN(_value) ? undefined : _value))
				.typeError('OTP should be all digits'),
	}),
});
const AuthForm = () => {
	const router = useRouter();
	const resolver = yupResolver(authValidationSchema);
	const form = useForm({ resolver });

	const showOTP = form.watch('showOTP');

	function onSubmit(data) {
		data.showOTP ? verifyOTP(data) : sendOTP(data);
	}

	async function sendOTP(data) {
		try {
			await axios.post('/api/auth/verify-user', data);

			window.appVerifier = new RecaptchaVerifier(
				firebaseAuth,
				'recaptcha-cont',
				{
					size: 'invisible',
				}
			);

			const fullNumber = `+91${data.mobile}`;
			const appVerifier = window.appVerifier;

			await setPersistence(firebaseAuth, inMemoryPersistence);

			const result = await signInWithPhoneNumber(
				firebaseAuth,
				fullNumber,
				appVerifier
			);

			window.confirmationResult = result;
			form.setValue('showOTP', true);

			toast({ title: 'OTP Sent to your SMS inbox' });
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,
				variant: 'destructive',
			});
			document.getElementById('recaptcha-cont').innerHTML = '';
		}
	}

	async function verifyOTP(data) {
		try {
			await window.confirmationResult.confirm(data.otp);
			const {
				data: { token },
			} = await axios.post('/api/auth/set-session', data);

			toast({ title: 'Authenticated' });

			setCookie('staffToken', token, { path: '/' });
			router.push('/');
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,
				variant: 'destructive',
			});
			document.getElementById('recaptcha-cont').innerHTML = '';
		}
	}

	return (
		<>
			<div id='recaptcha-cont' />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='mobile'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mobile Number</FormLabel>
								<FormControl>
									<Input
										type='tel'
										disabled={form.formState.isSubmitting || showOTP}
										placeholder='Mobile number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{showOTP && (
						<FormField
							control={form.control}
							name='otp'
							render={({ field }) => (
								<FormItem>
									<FormLabel>OTP</FormLabel>
									<FormControl>
										<Input
											type='tel'
											disabled={form.formState.isSubmitting}
											placeholder='OTP'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Enter The OTP received in your inbox
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<Button
						disabled={form.formState.isSubmitting}
						className='w-full my-2'
						type='submit'>
						{showOTP ? 'Verify OTP' : 'Send OTP'}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default AuthForm;
