import * as yup from 'yup';
import { specializations } from '../../constants/specializations';

export const procedureValidationSchema = yup.object({
	name: yup
		.string()
		.required('Procedure name required')
		.min(3, 'Minimum 3 characters')
		.max(25, 'Max  25 characters'),
	treatment: yup
		.string()
		.required('Treatment type required')
		.oneOf(specializations, 'Invalid Treatment Selected'),
	rate: yup
		.number()
		.integer('Should be an integer')
		.required('Procedure Rate Required')
		.moreThan(0, 'Rate should be more than 0'),
	doctorRate: yup
		.number()
		.integer('Rate should be an integer')
		.required("Doctor's Rate Required")
		.when('isDoctorRatePercentageValue', {
			is: true,
			then: () =>
				yup
					.number()
					.required("Doctor's Share Required")
					.integer('Should be an integer')
					.lessThan(100, 'Doctor Share to to be less than 100%'),
		}),
	officeRate: yup
		.number()
		.integer('Should be an integer')

		.required("Office's Rate Required")
		.when('isOfficeRatePercentageValue', {
			is: true,
			then: () =>
				yup
					.number()
					.integer('Should be an integer')

					.required("Office's Share Required")
					.lessThan(100, 'Office Share to to be less than 100%'),
		}),
	technicianRate: yup
		.number()
		.integer('Should be an integer')

		.required("Technician's Rate Required")
		.when('isTechnicianRatePercentageValue', {
			is: true,
			then: () =>
				yup
					.number()
					.integer('Should be an integer')
					.required("Technician's Share Required")
					.lessThan(100, 'Technician Share to to be less than 100%'),
		}),
	variableRate: yup.boolean(),
	isDoctorRatePercentageValue: yup.boolean(),
	isOfficeRatePercentageValue: yup.boolean(),
	isTechnicianRatePercentageValue: yup.boolean(),
});
