import { getCurrentUser } from '@/lib/actions/get-current-user';
import { getAppointmentDoctors } from '@/lib/actions/get-doctors';
import prisma from '@/lib/db/prisma';
import { attendanceValidationSchema } from '@/lib/schema/attendance-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();
		const doctors = await getAppointmentDoctors();
		const currentUser = await getCurrentUser();

		const validationSchema = attendanceValidationSchema(doctors);

		await validationSchema.validate(body);

		await prisma.attendance.create({
			data: { ...body, addedBy: currentUser.id },
		});

		return NextResponse.json({
			message: 'Attendance Marked',
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
