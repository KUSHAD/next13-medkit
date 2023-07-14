import { addDoctorValidationSchema } from '@/components/doctor/add-doctor-form';
import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		await addDoctorValidationSchema.validate(body);

		const doctorID = Number(id);

		if (isNaN(doctorID))
			return NextResponse.json({
				message: 'Invalid Doctor ID',
			});

		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: doctorID,
			},
		});

		if (!doctorExists)
			return NextResponse.json(
				{
					message: 'Invalid Doctor ID',
				},
				{ status: 400 }
			);

		if (!doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor already Restored',
				},
				{ status: 400 }
			);

		await prisma.doctor.update({
			where: {
				id: doctorID,
			},
			data: body,
		});

		return NextResponse.json({
			message: 'Doctor Edited',
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
