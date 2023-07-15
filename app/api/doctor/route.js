import prisma from '@/lib/db/prisma';
import { doctorValidationSchema } from '@/lib/schema/doctor-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		await doctorValidationSchema.validate(body);

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
