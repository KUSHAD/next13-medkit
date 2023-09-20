import * as zod from 'zod';

export const expenditureDocumentValidationSchema = zod.object({
	description: zod
		.string({
			required_error: 'Document Description Required',
		})
		.min(1, 'Document Description Required')
		.max(50, 'Maximum 50 Characters'),
	expenditureID: zod
		.string({
			required_error: 'Expediture ID Required',
		})
		.min(1, 'Expediture ID Required'),
	showUploader: zod.boolean(),
});
