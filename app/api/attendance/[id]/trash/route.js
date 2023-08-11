import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const attendanceExists = await prisma.attendance.findFirst({
			where: {
				id: id,
			},
		});

		if (!attendanceExists)
			return NextResponse.json(
				{
					message: 'Invalid Attendance ID',
				},
				{ status: 400 }
			);

		await prisma.attendance.delete({
			where: {
				id: attendanceExists.id,
			},
		});

		return NextResponse.json({
			message: 'Attendance Moved to Trash',
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
