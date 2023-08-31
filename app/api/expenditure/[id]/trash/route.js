import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import { utapi } from 'uploadthing/server';

export async function DELETE(_, { params: { id } }) {
	try {
		const expenditureExists = await prisma.expenditure.findFirst({
			where: {
				id: id,
			},
			include: {
				expenditureDocs: {
					select: {
						docSrc: true,
					},
				},
			},
		});

		if (!expenditureExists)
			return NextResponse.json(
				{
					message: 'Invalid Expenditure ID',
				},
				{ status: 400 }
			);

		const filesToDelete = expenditureExists.expenditureDocs.map(
			_doc => _doc.docSrc
		);

		await utapi.deleteFiles(filesToDelete);

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
