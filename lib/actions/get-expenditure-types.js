import prisma from '@/lib/db/prisma';

export async function getExpenditureTypes() {
	try {
		const expenditureTypes = await prisma.expenditureType.findMany({
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
		return expenditureTypes;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedExpenditureTypes() {
	try {
		const expenditureTypes = await prisma.expenditureType.findMany({
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
		return expenditureTypes;
	} catch (error) {
		throw new Error(error.message);
	}
}
