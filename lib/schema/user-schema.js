import * as yup from 'yup';

export const userValidationSchema = yup.object({
	mobile: yup
		.string()
		.required('Mobile Required')
		.length(10, 'Must be 10 digits')
		.transform(_value => (isNaN(_value) ? undefined : _value))
		.typeError('Mobile number should be all digits'),
	name: yup
		.string()
		.required('Name Required')
		.min(3, 'Minimum 3 Characters for name')
		.max(25, 'Maximum 25 characters for name'),
});
