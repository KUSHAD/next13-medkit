import prisma from '@/lib/db/prisma';
import { authValidationSchema } from '@/lib/schema/auth-schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const { mobile } = await authValidationSchema.validate(body);

		const staffExists = await prisma.staff.findMany({
			where: {
				mobileNumber: mobile,
				isTrashed: false,
			},
		});

		if (staffExists.length === 0)
			return NextResponse.json(
				{
					message: 'No Staff found with this mobile number',
				},
				{ status: 400 }
			);

		return NextResponse.json({
			message: 'Staff Verified',
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
