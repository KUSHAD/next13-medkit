import { getCurrentUser } from '@/lib/actions/get-current-user';
import { getExpenditureTypes } from '@/lib/actions/get-expenditure-types';
import prisma from '@/lib/db/prisma';
import { expenditureValidationSchema } from '@/lib/schema/expenditure/expenditure-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const currentUserData = await getCurrentUser();

		const expenditureTypesData = await getExpenditureTypes();

		const [currentUser, expenditureTypes] = await Promise.all([
			currentUserData,
			expenditureTypesData,
		]);

		await expenditureValidationSchema(expenditureTypes).validate(body);

		await prisma.expenditure.create({
			data: { ...body, addedBy: currentUser.id },
		});

		return NextResponse.json({
			message: 'Expediture Added',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: error.errors[0] ? 400 : 500,
			}
		);
	}
}
