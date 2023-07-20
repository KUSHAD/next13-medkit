import prisma from '@/lib/db/prisma';

export async function getUsers() {
	try {
		const users = await prisma.user.findMany({
			where: {
				isTrashed: false,
			},
			orderBy: [
				{
					name: 'asc',
				},
				{
					createdAt: 'desc',
				},
			],
		});
		return users;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedUsers() {
	try {
		const users = await prisma.user.findMany({
			where: {
				isTrashed: true,
			},
			orderBy: [
				{
					name: 'asc',
				},
				{
					createdAt: 'desc',
				},
			],
		});
		return users;
	} catch (error) {
		throw new Error(error.message);
	}
}
