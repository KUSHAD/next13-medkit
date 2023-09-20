import * as yup from 'yup';
import { days } from '../../constants/days';
import { slots } from '../../constants/slots';

export const scheduleValidationSchema = yup.object({
	day: yup
		.string()
		.oneOf(days, 'Day selected is not valid')
		.required('Required'),

	slot: yup
		.string()
		.required('Required')
		.oneOf(slots, 'Slot selected is not valid'),
});
