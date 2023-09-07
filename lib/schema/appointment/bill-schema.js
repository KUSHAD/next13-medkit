import * as yup from 'yup';

export const billValidationSchema = procedures =>
	yup.object({
		procedureID: yup
			.string()
			.oneOf(
				procedures.map(_procedure => _procedure.id),
				'Invalid Procedure Selected'
			)
			.required('Procedure required'),
		finalValue: yup
			.number()
			.integer('Should be an integer')
			.required('Bill Value required')
			.moreThan(0, 'Amount should be more than 0'),
		quantity: yup
			.number()
			.integer('Should be an integer')
			.required('Quantity Required')
			.moreThan(0, 'Quantity should be more than 0'),
	});
