import client from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
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

		if (!doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor already Restored',
				},
				{ status: 400 }
			);

		await client.doctor.update({
			where: {
				id: doctorExists.id,
			},
			data: {
				isTrashed: false,
			},
		});

		return NextResponse.json({
			message: 'Doctor Restored from Trash',
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