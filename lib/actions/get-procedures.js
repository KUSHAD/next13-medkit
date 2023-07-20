import prisma from '@/lib/db/prisma';

export async function getProcedures() {
	try {
		const procedures = await prisma.procedure.findMany({
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
		return procedures;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedProcedures() {
	try {
		const procedures = await prisma.procedure.findMany({
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
		return procedures;
	} catch (error) {
		throw new Error(error.message);
	}
}
