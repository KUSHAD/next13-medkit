import { getCurrentUser } from '@/lib/actions/get-current-user';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import { getProceduresByTreatment } from '@/lib/actions/get-procedures';
import prisma from '@/lib/db/prisma';
import { billValidationSchema } from '@/lib/schema/bill-schema';
import { NextResponse } from 'next/server';

export async function POST(req, { params: { id } }) {
	try {
		const body = await req.json();

		const procedures = await getProceduresByTreatment(body.type);

		const currentUser = await getCurrentUser();

		const validationSchema = billValidationSchema(procedures);

		const { finalValue, procedureID, quantity } =
			await validationSchema.validate(body);

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

		const procedureExists = await prisma.procedure.findFirst({
			where: {
				id: procedureID,
			},
		});

		if (!procedureExists)
			return NextResponse.json(
				{
					message: 'Invalid Procedure ID',
				},
				{ status: 400 }
			);

		if (procedureExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Procedure already Trashed',
				},
				{ status: 400 }
			);

		await prisma.bill.create({
			data: {
				finalValue,
				quantity,
				procedureID,
				appointmentID: appointmentExists.id,
				addedBy: currentUser.id,
			},
		});

		return NextResponse.json({
			message: 'Item Added',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: error.errors[0] ? 400 : 500,
			}
		);
	}
}
