import * as yup from 'yup';
import { modeOfPayment } from '@/lib/constants/mode-of-payment';

export const expenditureValidationSchema = expenditureTypes =>
	yup.object({
		expenditureTypeId: yup
			.string()
			.oneOf(
				expenditureTypes.map(
					_expenditureType => _expenditureType.id,
					'Invalid Expenditure Type Selected'
				)
			),
		amount: yup
			.number()
			.integer('Should be an integer')
			.required('Amount Required')
			.moreThan(0, 'Amount should be more than 0'),
		issueDate: yup.date().required('Issue Date required'),
		modeOfPayment: yup
			.string()
			.oneOf(modeOfPayment, 'Invalid Payment Mode Selected'),
		name: yup
			.string()
			.required('Name Required')
			.min(3, 'Minimum 3 Characters for name')
			.max(25, 'Maximum 25 characters for name'),
		mobileNumber: yup
			.string()
			.required('Mobile Required')
			.length(10, 'Must be 10 digits')
			.transform(_value => (isNaN(_value) ? undefined : _value))
			.typeError('Mobile number should be all digits'),
		chequeNo: yup.string().when('modeOfPayment', {
			is: modeOfPayment[1],
			then: () =>
				yup
					.string()
					.required('Cheque number required')
					.length(6, 'Contact number should be 6 digits')
					.transform(_value => (isNaN(_value) ? undefined : _value))
					.typeError('Cheque number should be all digits'),
		}),
		upiID: yup.string().when('modeOfPayment', {
			is: modeOfPayment[2],
			then: () =>
				yup
					.string()
					.required('UPI ID Required')
					.matches(
						/^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$/,
						'Invalid UPI ID'
					),
		}),
		bankTransactionID: yup.string().when('modeOfPayment', {
			is: modeOfPayment[3],
			then: () =>
				yup
					.string()
					.required('Bank Transaction ID required')
					.length(12, 'Bank Transaction ID should be 12 digits')
					.transform(_value => (isNaN(_value) ? undefined : _value))
					.typeError('Bank Transaction ID should be all digits'),
		}),
		description: yup
			.string()
			.min(10, 'Minimum 10 characters description')
			.max(100, 'Max 100 characters limit'),
	});
