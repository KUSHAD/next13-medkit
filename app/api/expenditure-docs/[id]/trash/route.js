import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import { utapi } from 'uploadthing/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const expenditureDocExists = await prisma.expenditureDocs.findFirst({
			where: {
				id: id,
			},
		});

		if (!expenditureDocExists)
			return NextResponse.json(
				{
					message: 'Invalid Expenditure Doc ID',
				},
				{ status: 400 }
			);

		await utapi.deleteFiles(expenditureDocExists.docSrc);

		await prisma.expenditureDocs.delete({
			where: {
				id: expenditureDocExists.id,
			},
		});

		return NextResponse.json({
			message: 'Expenditure Doc Moved to Trash',
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
