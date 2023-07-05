import client from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const scheduleID = Number(id);

		if (isNaN(scheduleID))
			return NextResponse.json({
				message: 'Invalid Schedule ID',
			});

		const scheduleExists = await client.schedule.findFirst({
			where: {
				id: scheduleID,
			},
		});

		if (!scheduleExists)
			return NextResponse.json(
				{
					message: 'Invalid Schedule ID',
				},
				{ status: 400 }
			);

		if (!scheduleExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Schedule already Restored',
				},
				{ status: 400 }
			);

		await client.schedule.update({
			where: {
				id: scheduleExists.id,
			},
			data: {
				isTrashed: false,
			},
			select: {
				id: true,
				day: true,
				slot: true,
			},
		});

		return NextResponse.json({
			message: 'Schedule Restored from Trash',
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
