import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import { getAppointmentUsers } from '@/lib/actions/get-users';
import prisma from '@/lib/db/prisma';
import { appointmentValidationSchema } from '@/lib/schema/appointment-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();
		const doctorData = await getAppointmentDoctors();
		const userData = await getAppointmentUsers();

		const [doctors, users] = await Promise.all([doctorData, userData]);

		const validationSchema = appointmentValidationSchema(doctors, users);

		await validationSchema.validate(body);

		await prisma.appointment.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Appointment Created',
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
