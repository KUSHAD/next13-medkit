import * as zod from 'zod';

export const expenditureDocumentValidationSchema = zod.object({
	description: zod
		.string({
			required_error: 'Document Description Required',
		})
		.max(50, 'Maximum 50 Characters'),
	expenditureID: zod.string({
		required_error: 'Expediture Type Required',
	}),
	showUploader: zod.boolean(),
});
