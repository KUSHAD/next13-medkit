import prisma from '@/lib/db/prisma';
import { doctorValidationSchema } from '@/lib/schema/doctor/doctor-schema';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		await doctorValidationSchema.validate(body);

		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: id,
			},
		});

		if (!doctorExists)
			return NextResponse.json(
				{
					message: 'Invalid Doctor ID',
				},
				{ status: 400 }
			);

		if (doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor already Trashed',
				},
				{ status: 400 }
			);

		await prisma.doctor.update({
			where: {
				id: id,
			},
			data: body,
		});

		return NextResponse.json({
			message: 'Doctor Edited',
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
