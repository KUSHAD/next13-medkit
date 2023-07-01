import client from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();

		await client.doctor.create({
			data: body,
		});

		return NextResponse.json({
			message: 'Doctor created',
		});
	} catch (error) {
		NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
