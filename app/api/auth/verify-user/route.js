import { authValidationSchema } from '@/components/auth/auth-form';
import prisma from '@/lib/prisma';
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
				message: error.errors || error.message,
			},
			{
				status: error.errors ? 400 : 500,
			}
		);
	}
}
