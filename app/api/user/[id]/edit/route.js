import { addUserValidationSchema } from '@/components/user/add-user-form';
import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		const { name, mobile } = await addUserValidationSchema.validate(body);

		const userID = Number(id);
		if (isNaN(userID))
			return NextResponse.json({
				message: 'Invalid User ID',
			});

		const userExists = await prisma.user.findFirst({
			where: {
				id: userID,
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
					id: userID,
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
				id: userID,
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
