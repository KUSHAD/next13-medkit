import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

/**
 * @param {NextRequest} req
 */
export async function POST(req) {
	try {
		const body = await req.json();

		const { mobile } = body;
		const staffExists = await prisma.staff.findMany({
			where: {
				mobileNumber: mobile,
				isTrashed: false,
			},
		});

		if (!staffExists.length === 0)
			return NextResponse.json(
				{
					message: 'No Staff found with this mobile number',
				},
				{ status: 400 }
			);

		const staff = staffExists[0].id;

		const token = jwt.sign({ staff }, process.env.AUTH_SECRET, {
			expiresIn: '4h',
		});

		return NextResponse.json({ message: 'Staff Authenticated', token });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
