import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const billExists = await prisma.bill.findFirst({
			where: {
				id: id,
			},
		});

		if (!billExists)
			return NextResponse.json(
				{
					message: 'Invalid Bill ID',
				},
				{ status: 400 }
			);

		if (billExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Bill already Trashed',
				},
				{ status: 400 }
			);

		await prisma.bill.update({
			where: {
				id: billExists.id,
			},
			data: {
				isTrashed: true,
			},
		});

		return NextResponse.json({
			message: 'Item Moved to Trash',
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
