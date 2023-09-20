import * as yup from 'yup';
import { slots } from '../../constants/slots';
import { specializations } from '../../constants/specializations';

export const appointmentValidationSchema = doctors =>
	yup.object({
		dateOfAppointment: yup.date().required('Date of appointment required'),
		mobile: yup
			.string()
			.required('Patient Mobile Required')
			.length(10, 'Must be 10 digits')
			.transform(_value => (isNaN(_value) ? undefined : _value))
			.typeError('Mobile number should be all digits'),
		name: yup
			.string()
			.required('Patient Name Required')
			.min(3, 'Minimum 3 Characters for Patient name')
			.max(25, 'Maximum 25 characters for Patient name'),
		slot: yup
			.string()
			.oneOf(slots, 'Invalid slot selected')
			.required('Slot required'),
		problemType: yup
			.string()
			.oneOf(specializations, 'Invalid Treatment selected')
			.required('Treatment required'),
		description: yup
			.string()
			.min(10, 'Minimum 10 characters description')
			.max(100, 'Max 100 characters limit'),
		address: yup
			.string()
			.min(10, 'Minimum 10 characters address')
			.max(100, 'Max 100 characters limit'),
		doctorID: yup
			.string()
			.oneOf(
				doctors.map(_doctor => _doctor.value),
				'Invalid Doctor Selected'
			)
			.required('Doctor is required'),
	});
