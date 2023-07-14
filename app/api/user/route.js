import { addUserValidationSchema } from '@/components/user/add-user-form';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		const { mobile, name } = await addUserValidationSchema.validate(body);

		const mobileExists = await prisma.user.findUnique({
			where: {
				mobileNumber: mobile,
			},
		});

		if (mobileExists)
			return NextResponse.json(
				{
					message: 'User with this mobile number already exists',
				},
				{ status: 400 }
			);

		await prisma.user.create({
			data: { name, mobileNumber: mobile },
		});

		return NextResponse.json({
			message: 'User created',
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
