import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const billExists = await prisma.bill.findFirst({
			where: {
				id: id,
			},
			include: {
				appointment: {
					select: {
						isBilled: true,
						isPartPaymentEnabled: true,
					},
				},
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
					message: 'Bill Item already Trashed',
				},
				{ status: 400 }
			);

		if (
			billExists.appointment.isBilled ||
			billExists.appointment.isPartPaymentEnabled
		)
			return NextResponse.json(
				{
					message: 'Payment has already been made or Part paymennt enabled',
				},
				{ status: 400 }
			);

		await prisma.bill.delete({
			where: {
				id: billExists.id,
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
