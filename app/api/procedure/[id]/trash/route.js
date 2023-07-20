import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const procedureExists = await prisma.procedure.findFirst({
			where: {
				id: id,
			},
		});

		if (!procedureExists)
			return NextResponse.json(
				{
					message: 'Invalid Procedure ID',
				},
				{ status: 400 }
			);

		if (procedureExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Procedure already Trashed',
				},
				{ status: 400 }
			);

		await prisma.procedure.update({
			where: {
				id: procedureExists.id,
			},
			data: {
				isTrashed: true,
			},
		});

		return NextResponse.json({
			message: 'Procedure Moved to Trash',
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
