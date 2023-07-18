import prisma from '@/lib/db/prisma';
import { procedureValidationSchema } from '@/lib/schema/procedure-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		await procedureValidationSchema.validate(body);

		await prisma.procedure.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Procedure Created',
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
