import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { procedureValidationSchema } from '@/lib/schema/procedure-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const currentUser = await getCurrentUser();

		await procedureValidationSchema.validate(body);

		await prisma.procedure.create({
			data: { ...body, addedBy: currentUser.id },
		});

		return NextResponse.json({
			message: 'Procedure Created',
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
