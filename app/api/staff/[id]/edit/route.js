import { addStaffValidationSchema } from '@/components/staff/add-staff-form';
import prisma from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params: { id } }) {
	try {
		const body = await req.json();

		const { mobile, name } = await addStaffValidationSchema.validate(body);

		const staffID = Number(id);
		if (isNaN(staffID))
			return NextResponse.json({
				message: 'Invalid Staff ID',
			});

		const staffExists = await prisma.staff.findFirst({
			where: {
				id: staffID,
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
					id: staffID,
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
				id: staffID,
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
				message: error.errors || error.message,
			},
			{
				status: error.errors ? 400 : 500,
			}
		);
	}
}
