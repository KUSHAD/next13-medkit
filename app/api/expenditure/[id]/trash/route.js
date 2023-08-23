import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const expenditureExists = await prisma.expenditure.findFirst({
			where: {
				id: id,
			},
		});

		if (!expenditureExists)
			return NextResponse.json(
				{
					message: 'Invalid Expenditure ID',
				},
				{ status: 400 }
			);

		await prisma.expenditure.delete({
			where: {
				id: expenditureExists.id,
			},
		});

		return NextResponse.json({
			message: 'Expenditure Moved to Trash',
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
