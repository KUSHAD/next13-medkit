import client from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params: { id } }) {
	try {
		const doctorID = Number(id);

		if (isNaN(doctorID))
			return NextResponse.json({
				message: 'Invalid Doctor ID',
			});

		const doctorExists = await client.doctor.findFirst({
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

		if (doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor is trashed',
				},
				{ status: 400 }
			);

		const schedule = await client.schedule.findMany({
			where: {
				isTrashed: true,
				doctorId: doctorID,
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
