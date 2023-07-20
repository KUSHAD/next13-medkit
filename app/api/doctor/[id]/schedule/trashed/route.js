import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params: { id } }) {
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
					message: 'Doctor is trashed',
				},
				{ status: 400 }
			);

		const schedule = await prisma.schedule.findMany({
			where: {
				isTrashed: true,
				doctorId: id,
			},
			select: {
				id: true,
				day: true,
				slot: true,
				isTrashed: true,
			},
		});

		return NextResponse.json({
			schedule,
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
