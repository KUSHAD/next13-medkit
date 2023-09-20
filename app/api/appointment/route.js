import { getCurrentUser } from '@/lib/actions/get-current-user';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import prisma from '@/lib/db/prisma';
import { appointmentValidationSchema } from '@/lib/schema/appointment/appointment-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();
		const doctors = await getAppointmentDoctors();
		const currentUser = await getCurrentUser();

		const validationSchema = appointmentValidationSchema(doctors);

		await validationSchema.validate(body);

		await prisma.appointment.create({
			data: {
				...body,
				addedBy: currentUser.id,
			},
		});

		return NextResponse.json({
			message: 'Appointment Created',
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
