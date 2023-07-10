import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

export async function getCurrentUser() {
	try {
		const cookie = cookies().get('staffToken');
		if (!cookie) throw new Error('Unauthorized');

		const { staff } = jwt.verify(cookie.value, process.env.AUTH_SECRET);

		const user = await prisma.staff.findMany({
			where: {
				id: staff,
				isTrashed: false,
			},
			select: {
				id: true,
			},
		});

		if (user.length === 0) throw new Error('Unauthorized');

		return user[0];
	} catch (error) {
		throw Error(error.message);
	}
}
