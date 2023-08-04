import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const appointmentExists = await prisma.appointment.findFirst({
			where: {
				id: id,
			},
		});

		if (!appointmentExists)
			return NextResponse.json(
				{
					message: 'Invalid Appointment ID',
				},
				{ status: 400 }
			);

		if (appointmentExists.isArrived)
			return NextResponse.json(
				{
					message: 'User already arrived cannot delete appointment',
				},
				{ status: 400 }
			);

		await prisma.appointment.delete({
			where: {
				id: appointmentExists.id,
			},
		});

		return NextResponse.json({
			message: 'Appointment Moved to Trash',
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
