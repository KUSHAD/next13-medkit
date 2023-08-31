import { createUploadthing } from 'uploadthing/next';
import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { expenditureDocumentValidationSchema } from '@/lib/schema/expenditure-document-schema';
import * as zod from 'zod';
import { revalidatePath } from 'next/cache';

const f = createUploadthing({
	errorFormatter: error => {
		return {
			message: error.message,
			zodError:
				error.cause instanceof zod.ZodError ? error.cause.flatten() : null,
		};
	},
});

export const fileRouter = {
	expenditureDocs: f({
		image: { maxFileCount: 1, maxFileSize: '1MB' },
	})
		.input(expenditureDocumentValidationSchema)
		.middleware(async ({ input }) => {
			const user = await getCurrentUser();

			if (!user) throw new Error('Unauthorized');

			return {
				description: input.description,
				expenditureID: input.expenditureID,
				uploadedBy: user.id,
			};
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				const expenditureExists = await prisma.expenditure.findFirst({
					where: {
						id: metadata.expenditureID,
					},
				});

				if (!expenditureExists)
					throw new Error(
						{
							message: 'Invalid Expenditure ID',
						},
						{ status: 400 }
					);
				await prisma.expenditureDocs.create({
					data: {
						description: metadata.description,
						docSrc: file.key,
						addedBy: metadata.uploadedBy,
						expenditureID: expenditureExists.id,
					},
				});

				revalidatePath(`/expenditure/${metadata.expenditureID}/view`);
			} catch (error) {
				throw new Error({
					message: error.message,
				});
			}
		}),
};
