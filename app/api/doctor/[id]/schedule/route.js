import { getCurrentUser } from '@/lib/actions/get-current-user';
import prisma from '@/lib/db/prisma';
import { scheduleValidationSchema } from '@/lib/schema/doctor/schedule-schema';
import { NextResponse } from 'next/server';

export async function POST(req, { params: { id } }) {
	try {
		const body = await req.json();

		const currentUser = await getCurrentUser();

		await scheduleValidationSchema.validate(body);

		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: id,
			},
		});

		if (!doctorExists)
			return NextResponse.json(
				{
					message: 'Invalid Doctor ID',
				},
				{ status: 400 }
			);

		if (doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor is trashed',
				},
				{ status: 400 }
			);

		const schedule = await prisma.schedule.create({
			data: {
				...body,
				doctorId: id,
				addedBy: currentUser.id,
			},
			select: {
				day: true,
				slot: true,
			},
		});

		return NextResponse.json({
			message: 'Schedule Added',
			schedule,
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

export async function GET(_, { params: { id } }) {
	try {
		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: id,
			},
		});

		if (!doctorExists)
			return NextResponse.json(
				{
					message: 'Invalid Doctor ID',
				},
				{ status: 400 }
			);

		if (doctorExists.isTrashed)
			return NextResponse.json(
				{
					message: 'Doctor is trashed',
				},
				{ status: 400 }
			);

		const schedule = await prisma.schedule.findMany({
			where: {
				doctorId: id,
			},
			select: {
				id: true,
				day: true,
				slot: true,
			},
		});

		return NextResponse.json({
			schedule,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}
