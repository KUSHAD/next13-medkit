import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import prisma from '@/lib/db/prisma';
import { attendanceValidationSchema } from '@/lib/schema/attendance-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();
		const doctors = await getAppointmentDoctors();

		const validationSchema = attendanceValidationSchema(doctors);

		await validationSchema.validate(body);

		await prisma.attendance.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Attendance Marked',
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
