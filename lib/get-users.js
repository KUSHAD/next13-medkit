import client from './prisma';

export async function getUsers() {
	try {
		const users = await client.user.findMany({
			where: {
				isTrashed: false,
			},
		});
		return users;
	} catch (error) {
		throw new Error(error.message);
	}
}
