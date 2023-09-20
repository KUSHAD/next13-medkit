import { createUploadthing } from 'uploadthing/next';
import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { expenditureDocumentValidationSchema } from '@/lib/schema/expenditure/expenditure-document-schema';
import * as zod from 'zod';
import { revalidatePath } from 'next/cache';
import { appointmentTestValidationSchema } from '@/lib/schema/appointment/appointment-test-schema';

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

			const expenditureExists = await prisma.expenditure.findFirst({
				where: {
					id: input.expenditureID,
				},
			});

			if (!expenditureExists) throw new Error('Invalid Expenditure ID');

			return {
				description: input.description,
				expenditureID: input.expenditureID,
				uploadedBy: user.id,
			};
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				await prisma.expenditureDocs.create({
					data: {
						description: metadata.description,
						docSrc: file.key,
						addedBy: metadata.uploadedBy,
						expenditureID: metadata.expenditureID,
					},
				});

				revalidatePath(`/expenditure/${metadata.expenditureID}/view`);
			} catch (error) {
				throw new Error({
					message: error.message,
				});
			}
		}),
	appointmentTests: f({
		image: { maxFileCount: 1, maxFileSize: '1MB' },
	})
		.input(appointmentTestValidationSchema)
		.middleware(async ({ input }) => {
			const user = await getCurrentUser();

			if (!user) throw new Error('Unauthorized');

			const appointmentExists = await prisma.appointment.findFirst({
				where: {
					id: input.appointmentID,
				},
			});

			if (!appointmentExists) throw new Error('Invalid Appointment ID');

			if (appointmentExists.isBilled)
				throw new Error('Appointment already billed');

			return {
				description: input.description,
				appointmentID: input.appointmentID,
				uploadedBy: user.id,
			};
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				await prisma.appointmentTests.create({
					data: {
						description: metadata.description,
						docSrc: file.key,
						addedBy: metadata.uploadedBy,
						appointmentID: metadata.appointmentID,
					},
				});

				revalidatePath(`/appointment/${metadata.appointmentID}/bill`);
			} catch (error) {
				throw new Error({
					message: error.message,
				});
			}
		}),
};
