import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/db/prisma';

export async function getCurrentUser() {
	try {
		const cookie = cookies().get('staffToken');
		if (!cookie) throw new Error('Unauthorized');

		const { staff } = jwt.verify(cookie.value, process.env.AUTH_SECRET);

		const user = await prisma.staff.findFirst({
			where: {
				id: staff,
				isTrashed: false,
			},
		});

		if (!user) throw new Error('Unauthorized');

		return user;
	} catch (error) {
		throw Error(error.message);
	}
}
