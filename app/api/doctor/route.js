import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { doctorValidationSchema } from '@/lib/schema/doctor/doctor-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const currentUser = await getCurrentUser();

		await doctorValidationSchema.validate(body);

		await prisma.doctor.create({
			data: { ...body, addedBy: currentUser.id },
		});

		return NextResponse.json({
			message: 'Doctor created',
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
