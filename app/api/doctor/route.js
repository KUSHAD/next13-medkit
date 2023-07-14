import { addDoctorValidationSchema } from '@/components/doctor/add-doctor-form';
import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		await addDoctorValidationSchema.validate(body);

		await prisma.doctor.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Doctor created',
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
