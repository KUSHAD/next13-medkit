import * as yup from 'yup';

export const authValidationSchema = yup.object({
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
