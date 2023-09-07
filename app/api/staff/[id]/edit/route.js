import prisma from '@/lib/db/prisma';
import { staffValidationSchema } from '@/lib/schema/staff/staff-schema';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		const { mobile, name } = await staffValidationSchema.validate(body);

		const staffExists = await prisma.staff.findFirst({
			where: {
				id: id,
			},
		});

		if (!staffExists)
			return NextResponse.json(
				{
					message: 'Invalid Staff ID',
				},
				{ status: 400 }
			);

		if (staffExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Staff already Trashed',
				},
				{ status: 400 }
			);

		const mobileExists = await prisma.staff.findFirst({
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
					message: 'Staff with this mobile number already exists',
				},
				{ status: 400 }
			);

		await prisma.staff.update({
			where: {
				id: id,
			},
			data: {
				mobileNumber: mobile,
				name: name,
			},
		});

		return NextResponse.json({
			message: 'Staff Updated',
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
