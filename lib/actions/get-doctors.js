import prisma from '@/lib/db/prisma';

export async function getDoctors() {
	try {
		const doctors = await prisma.doctor.findMany({
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
		return doctors;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedDoctors() {
	try {
		const doctors = await prisma.doctor.findMany({
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
		return doctors;
	} catch (error) {
		throw new Error(error.message);
	}
}
