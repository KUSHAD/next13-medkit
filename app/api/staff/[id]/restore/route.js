import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const staffID = Number(id);

		if (isNaN(staffID))
			return NextResponse.json({
				message: 'Invalid Staff ID',
			});

		const staffExists = await prisma.staff.findFirst({
			where: {
				id: staffID,
			},
		});

		if (!staffExists)
			return NextResponse.json(
				{
					message: 'Invalid Staff ID',
				},
				{ status: 400 }
			);

		if (!staffExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Staff already Restored',
				},
				{ status: 400 }
			);

		await prisma.staff.update({
			where: {
				id: staffExists.id,
			},
			data: {
				isTrashed: false,
			},
		});

		return NextResponse.json({
			message: 'Staff Restored from Trash',
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
