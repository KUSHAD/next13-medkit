import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const scheduleExists = await prisma.schedule.findFirst({
			where: {
				id: id,
			},
		});

		if (!scheduleExists)
			return NextResponse.json(
				{
					message: 'Invalid Schedule ID',
				},
				{ status: 400 }
			);

		await prisma.schedule.delete({
			where: {
				id: scheduleExists.id,
			},
		});

		return NextResponse.json({
			message: 'Schedule Moved to Trash',
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
