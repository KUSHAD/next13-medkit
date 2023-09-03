import * as zod from 'zod';

export const appointmentTestValidationSchema = zod.object({
	description: zod
		.string({
			required_error: 'Test Description Required',
		})
		.min(1, 'Test Description Required')
		.max(50, 'Maximum 50 Characters'),
	appointmentID: zod
		.string({
			required_error: 'Appointment ID Required',
		})
		.min(1, 'Appointment ID Required'),
	showUploader: zod.boolean(),
});
