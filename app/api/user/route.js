import client from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		const body = await req.json();
		const { name, mobile } = body;

		if (!name || !mobile)
			return NextResponse.json(
				{
					message: 'All fields are required',
				},
				{ status: 400 }
			);
		const mobileExists = await client.user.findUnique({
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

		const newUser = await client.user.create({
			data: {
				name,
				mobileNumber: mobile,
			},
		});

		return NextResponse.json({
			message: 'User created',
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
