import prisma from '@/lib/db/prisma';
import { userValidationSchema } from '@/lib/schema/user-schema';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		const { name, mobile } = await userValidationSchema.validate(body);

		const userExists = await prisma.user.findFirst({
			where: {
				id: id,
			},
		});

		if (!userExists)
			return NextResponse.json(
				{
					message: 'Invalid User ID',
				},
				{ status: 400 }
			);

		if (userExists.isTrashed)
			return NextResponse.json(
				{
					message: 'User already Trashed',
				},
				{ status: 400 }
			);

		const mobileExists = await prisma.user.findFirst({
			where: {
				mobileNumber: mobile,
				NOT: {
					id: id,
				},
			},
		});

		if (mobileExists)
			return NextResponse.json(
				{
					message: 'User with this mobile number already exists',
				},
				{ status: 400 }
			);

		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				mobileNumber: mobile,
				name: name,
			},
		});

		return NextResponse.json({
			message: 'User Updated',
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
