import * as yup from 'yup';

export const expenditureTypeValidationSchema = yup.object({
	name: yup
		.string()
		.required('Expenditure Type Name Required')
		.min(3, 'Minimum 3 Characters for Expenditure Type name')
		.max(25, 'Maximum 25 characters for Expenditure Type name'),
	amount: yup
		.number()
		.required('Amount required')
		.integer('Must be a integer')
		.moreThan(0, 'Amount should be more than 0'),
});
