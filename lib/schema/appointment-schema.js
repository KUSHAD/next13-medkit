import * as yup from 'yup';
import { slots } from '../constants/slots';
import { specializations } from '../constants/specializations';

export const appointmentValidationSchema = (doctors, users) =>
	yup.object({
		dateOfAppointment: yup.date().required('Date of appointment required'),
		userID: yup
			.string()
			.oneOf(
				users.map(_user => _user.value),
				'Invalid User Selected'
			)
			.required('User is required'),
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
