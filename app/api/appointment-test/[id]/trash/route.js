import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import { utapi } from 'uploadthing/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const appointmentTestExists = await prisma.appointmentTests.findFirst({
			where: {
				id: id,
			},
			include: {
				appointment: {
					select: {
						isBilled: true,
					},
				},
			},
		});

		if (!appointmentTestExists)
			return NextResponse.json(
				{
					message: 'Invalid Test Document ID',
				},
				{ status: 400 }
			);

		if (appointmentTestExists.appointment.isBilled)
			return NextResponse.json(
				{
					message: 'Appointment already billed, cannot delete test documents',
				},
				{ status: 400 }
			);

		await utapi.deleteFiles(appointmentTestExists.docSrc);

		await prisma.appointmentTests.delete({
			where: {
				id: appointmentTestExists.id,
			},
		});

		return NextResponse.json({
			message: 'Test Document Moved to Trash',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}
