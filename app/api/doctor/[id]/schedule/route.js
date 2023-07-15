import { doctorSchedulesValidationSchema } from '@/components/doctor/schedule/add-doctor-schedule';
import prisma from '@/lib/db/prisma';
import { scheduleValidationSchema } from '@/lib/schema/schedule-schema';
import { NextResponse } from 'next/server';

export async function POST(req, { params: { id } }) {
	try {
		const body = await req.json();

		await scheduleValidationSchema.validate(body);

		const doctorID = Number(id);

		if (isNaN(doctorID))
			return NextResponse.json({
				message: 'Invalid Doctor ID',
			});

		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: doctorID,
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
				doctorId: doctorID,
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
				message: error.errors || error.message,
			},
			{
				status: error.errors ? 400 : 500,
			}
		);
	}
}

export async function GET(_, { params: { id } }) {
	try {
		const doctorID = Number(id);

		if (isNaN(doctorID))
			return NextResponse.json({
				message: 'Invalid Doctor ID',
			});

		const doctorExists = await prisma.doctor.findFirst({
			where: {
				id: doctorID,
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
				isTrashed: false,
				doctorId: doctorID,
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
