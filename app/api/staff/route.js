import prisma from '@/lib/db/prisma';
import { staffValidationSchema } from '@/lib/schema/staff-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const { mobile, name } = await staffValidationSchema.validate(body);
		const mobileExists = await prisma.staff.findUnique({
			where: {
				mobileNumber: mobile,
			},
		});

		if (mobileExists)
			return NextResponse.json(
				{
					message: 'Staff with this mobile number already exists',
				},
				{ status: 400 }
			);

		await prisma.staff.create({
			data: { name, mobileNumber: mobile },
		});

		return NextResponse.json({
			message: 'Staff created',
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
