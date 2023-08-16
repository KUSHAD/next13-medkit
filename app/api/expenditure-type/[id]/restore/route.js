import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_, { params: { id } }) {
	try {
		const expenditureTypeExists = await prisma.expenditureType.findFirst({
			where: {
				id: id,
			},
		});

		if (!expenditureTypeExists)
			return NextResponse.json(
				{
					message: 'Invalid Expenditure Type ID',
				},
				{ status: 400 }
			);

		if (!expenditureTypeExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Expenditure Type already Restored',
				},
				{ status: 400 }
			);

		await prisma.expenditureType.update({
			where: {
				id: expenditureTypeExists.id,
			},
			data: {
				isTrashed: false,
			},
		});

		return NextResponse.json({
			message: 'Expenditure Type Restored from Trash',
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
