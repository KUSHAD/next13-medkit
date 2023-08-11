import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { partPaymentValidationSchema } from '@/lib/schema/part-payment-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const { appointmentID, paymentID } = body;

		const currentUser = await getCurrentUser();

		const { amount, dateOfPayment } =
			await partPaymentValidationSchema.validate(body);

		const appointmentExists = await prisma.appointment.findFirst({
			where: {
				id: appointmentID,
			},
		});

		const paymentExists = await prisma.payment.findFirst({
			where: {
				id: paymentID,
			},
		});

		if (!appointmentExists || !paymentExists)
			return NextResponse.json(
				{
					message: 'Invalid Appointment or Payment ID',
				},
				{ status: 400 }
			);

		if (appointmentExists.isBilled)
			return NextResponse.json(
				{
					message:
						'Appointment has been billed cannot add anymore part payments',
				},
				{ status: 400 }
			);

		if (
			!appointmentExists.isPartPaymentEnabled ||
			!paymentExists.isPartPaymentEnabled
		)
			return NextResponse.json(
				{
					message: 'Part payment not enabled for  this appointment',
				},
				{ status: 400 }
			);

		const partPaymentSum = await prisma.partPayment.aggregate({
			where: {
				appointmentID: appointmentID,
			},
			_sum: {
				amount: true,
			},
		});

		if (
			partPaymentSum._sum.amount > paymentExists.total ||
			partPaymentSum._sum.amount + amount > paymentExists.total
		)
			return NextResponse.json(
				{
					message: 'Paying more than the total amount',
				},
				{ status: 400 }
			);

		await prisma.partPayment.create({
			data: {
				amount,
				dateOfPayment,
				appointmentID,
				paymentID,
				addedBy: currentUser.id,
			},
		});

		const total = partPaymentSum._sum.amount + amount;

		if (total === paymentExists.total) {
			await prisma.appointment.update({
				where: {
					id: appointmentExists.id,
				},
				data: {
					isBilled: true,
				},
			});
		}

		return NextResponse.json({
			message: 'Part Payment Added',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.errors || error.message,
			},
			{
				status: error.errors ? 400 : 500,
			}
		);
	}
}
