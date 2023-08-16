import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { expenditureTypeValidationSchema } from '@/lib/schema/expenditure-type-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const currentUser = await getCurrentUser();

		await expenditureTypeValidationSchema.validate(body);

		await prisma.expenditureType.create({
			data: { ...body, addedBy: currentUser.id },
		});

		return NextResponse.json({
			message: 'Expenditure Type created',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.errors || error.message,
			},
			{
				status: error.errors ? 400 : 500,
			}
		);
	}
}
