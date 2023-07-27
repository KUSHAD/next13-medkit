import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const { total, appointmentID } = body;

		const appointmentExists = await prisma.appointment.findFirst({
			where: {
				id: appointmentID,
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

		const newPayment = await prisma.payment.create({
			data: {
				total,
				appointmentID,
			},
		});

		await prisma.appointment.update({
			where: {
				id: appointmentID,
			},
			data: {
				hasBilled: true,
			},
		});

		await prisma.bill.updateMany({
			where: {
				appointmentID,
			},
			data: {
				paymentId: newPayment.id,
			},
		});

		return NextResponse.json({
			message: 'Payment Completed',
		});
	} catch (error) {
		return NextResponse.json({
			message: error.message,
		});
	}
}
