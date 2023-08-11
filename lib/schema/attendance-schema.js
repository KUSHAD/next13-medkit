import * as yup from 'yup';

export const attendanceValidationSchema = doctors =>
	yup.object({
		dateOfAttendance: yup.date().required('Date of Attendance required'),
		doctorID: yup
			.string()
			.oneOf(
				doctors.map(_doctor => _doctor.value),
				'Invalid Doctor Selected'
			)
			.required('Doctor is required'),
	});
