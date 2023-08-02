import * as yup from 'yup';

export const partPaymentValidationSchema = yup.object({
	amount: yup
		.number()
		.required('Payment Amount required')
		.integer('Must be a integer')
		.moreThan(0, 'Amount should be more than 0'),
	dateOfPayment: yup.date().required('Date of Payment required'),
});
