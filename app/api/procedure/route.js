import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		return NextResponse.json({
			message: 'Procedure Created',
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
