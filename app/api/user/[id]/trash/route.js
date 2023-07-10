import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const userID = Number(id);

		if (isNaN(userID))
			return NextResponse.json({
				message: 'Invalid User ID',
			});

		const userExists = await prisma.user.findFirst({
			where: {
				id: userID,
			},
		});

		if (!userExists)
			return NextResponse.json(
				{
					message: 'Invalid User ID',
				},
				{ status: 400 }
			);

		if (userExists.isTrashed)
			return NextResponse.json(
				{
					message: 'User already Trashed',
				},
				{ status: 400 }
			);

		await prisma.user.update({
			where: {
				id: userExists.id,
			},
			data: {
				isTrashed: true,
			},
		});

		return NextResponse.json({
			message: 'User Moved to Trash',
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
