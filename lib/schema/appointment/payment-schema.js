import * as yup from 'yup';

export const paymentValidationSchema = yup.object({
	partPaymentEnabled: yup.boolean(),
	dateOfPayment: yup.date().required('Date of Payment required'),
	total: yup
		.number()
		.required('Total Payment Amount required')
		.integer('Must be a integer')
		.moreThan(0, 'Amount should be more than 0'),
});
