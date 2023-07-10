import prisma from './prisma';

export async function getUsers() {
	try {
		const users = await prisma.user.findMany({
			where: {
				isTrashed: false,
			},
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
		});
		return users;
	} catch (error) {
		throw new Error(error.message);
	}
}
