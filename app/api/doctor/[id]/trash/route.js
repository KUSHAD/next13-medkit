import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
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
				id: doctorExists.id,
			},
			data: {
				isTrashed: true,
			},
		});

		await prisma.schedule.deleteMany({
			where: {
				doctorId: doctorExists.id,
			},
		});

		return NextResponse.json({
			message: 'Doctor Moved to Trash',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}
