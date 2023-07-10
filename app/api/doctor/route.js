import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		await prisma.doctor.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Doctor created',
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
