import * as yup from 'yup';
import { specializations } from '../constants/specializations';

export const doctorValidationSchema = yup.object({
	specialization: yup
		.string()
		.required('Specialization Required')
		.oneOf(specializations, 'Doctor specialization is not valid'),
	name: yup
		.string()
		.required('Name Required')
		.min(3, 'Minimum 3 Characters for name')
		.max(25, 'Maximum 25 characters for name'),
});
