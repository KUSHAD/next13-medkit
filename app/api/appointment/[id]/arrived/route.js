import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
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

		if (appointmentExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Appointment already Trashed',
				},
				{ status: 400 }
			);

		await prisma.appointment.update({
			where: {
				id: appointmentExists.id,
			},
			data: {
				hasArrived: true,
			},
		});

		return NextResponse.json({
			message: 'Patient Arrived for appointment',
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
