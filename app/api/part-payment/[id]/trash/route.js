import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const partPaymentExists = await prisma.partPayment.findFirst({
			where: {
				id: id,
			},
			include: {
				appointment: {
					select: {
						hasBilled: true,
					},
				},
			},
		});

		if (!partPaymentExists)
			return NextResponse.json(
				{
					message: 'Invalid Part Payment ID',
				},
				{ status: 400 }
			);

		if (partPaymentExists.appointment.hasBilled)
			return NextResponse.json(
				{
					message: 'Appointment already billed cannot delete entry',
				},
				{ status: 400 }
			);

		await prisma.partPayment.delete({
			where: {
				id: partPaymentExists.id,
			},
		});

		return NextResponse.json({
			message: 'Part Payment Moved to Trash',
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
