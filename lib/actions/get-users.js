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

export async function getAppointmentUsers() {
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
			select: {
				id: true,
				name: true,
			},
		});
		return users.map(_user => ({
			label: _user.name,
			value: _user.id,
		}));
	} catch (error) {
		throw new Error(error.message);
	}
}
