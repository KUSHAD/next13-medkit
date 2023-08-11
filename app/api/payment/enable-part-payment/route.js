import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { paymentValidationSchema } from '@/lib/schema/payment-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const currentUser = await getCurrentUser();

		const { total, dateOfPayment, partPaymentEnabled } =
			await paymentValidationSchema.validate(body);

		const { appointmentID } = body;

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

		if (appointmentExists.isBilled || appointmentExists.isPartPaymentEnabled)
			return NextResponse.json(
				{
					message: 'Payment has already been made or Part paymennt enabled',
				},
				{ status: 400 }
			);

		const billExists = await prisma.bill.findMany({
			where: { appointmentID },
		});

		if (billExists.length === 0)
			return NextResponse.json(
				{
					message: 'There is no bill for the appointment',
				},
				{ status: 400 }
			);

		const newPayment = await prisma.payment.create({
			data: {
				total,
				appointmentID,
				isPartPaymentEnabled: partPaymentEnabled,
				dateOfPayment,
				addedBy: currentUser.id,
			},
		});

		await prisma.appointment.update({
			where: {
				id: appointmentID,
			},
			data: {
				isPartPaymentEnabled: partPaymentEnabled,
			},
		});

		await prisma.bill.updateMany({
			where: {
				appointmentID,
			},
			data: {
				paymentID: newPayment.id,
			},
		});

		return NextResponse.json({
			message: 'Part Payment Enabled',
		});
	} catch (error) {
		return NextResponse.json({
			message: error.message,
		});
	}
}
